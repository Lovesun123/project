import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import SignUp from './pages/SignUp';
import SignUpBusiness from './pages/SignUpBusiness';
import SignUpInfluencer from './pages/SignUpInfluencer';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Requests from './pages/Requests';

function App() {
  const [data, setData] = useState([])
  const [newItem, setNewItem] = useState({ id: '', name: '', description: '', price: '', message: '' })
  const [editingItem, setEditingItem] = useState(null)
  // Use RAILWAY_API_URL environment variable for Railway deployment  
  const API_URL = import.meta.env.VITE_RAILWAY_API_URL || 'http://localhost:3001'

  // CRUD Operations - HTTP Requests:
  
  // READ: Fetch all data items (HTTP GET)
  // GET /api/data - Retrieves all items from the database
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/data`)
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // CREATE: Add new data item (HTTP POST)
  // POST /api/data - Creates a new item in the database
  const createItem = async (event) => {
    event.preventDefault()
    
    // Validate all fields are filled
    if (!newItem.id.trim() || !newItem.name.trim() || !newItem.description.trim() || !newItem.price.trim() || !newItem.message.trim()) {
      alert('Please fill in all fields before saving.')
      return
    }
    
    console.log('API_URL:', API_URL)
    console.log('Sending data:', { id: newItem.id, data: { name: newItem.name, description: newItem.description, price: newItem.price, message: newItem.message } })
    
    try {
      const response = await fetch(`${API_URL}/api/data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: newItem.id,
          data: { name: newItem.name, description: newItem.description, price: newItem.price, message: newItem.message }
        })
      })
      
      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)
      
      if (response.ok) {
        const responseData = await response.json()
        console.log('Success response:', responseData)
        setNewItem({ id: '', name: '', description: '', price: '', message: '' })
        fetchData()
      } else {
        const errorData = await response.text()
        console.error('Error response:', errorData)
        alert(`Error saving item: ${response.status} - ${errorData}`)
      }
    } catch (error) {
      console.error('Network error creating item:', error)
      alert(`Network error: ${error.message}`)
    }
  }

  // UPDATE: Modify existing data item (HTTP PUT)
  // PUT /api/data/:id - Updates an existing item by ID in the database
  const updateItem = async (event) => {
    event.preventDefault()
    
    // Validate all fields are filled
    if (!editingItem.name.trim() || !editingItem.description.trim() || !editingItem.price.trim() || !editingItem.message.trim()) {
      alert('Please fill in all fields before saving.')
      return
    }
    
    try {
      const response = await fetch(`${API_URL}/api/data/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: { name: editingItem.name, description: editingItem.description, price: editingItem.price, message: editingItem.message }
        })
      })
      if (response.ok) {
        setEditingItem(null)
        fetchData()
      }
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }

  // DELETE: Remove data item (HTTP DELETE)
  // DELETE /api/data/:id - Deletes an item by ID from the database
  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/data/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        fetchData()
      }
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen" style={{ backgroundColor: '#e1f3f4' }}>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signup/business" element={<SignUpBusiness />} />
              <Route path="/signup/influencer" element={<SignUpInfluencer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/requests" element={<Requests />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;