import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { X } from 'lucide-react';

export default function Requests() {
  const { user, API_URL, updateProfile } = useAuth();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);

  // Redirect if not an influencer
  if (!user || user.userType !== 'influencer') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#e1f3f4' }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#7b3b3b' }}>
            Access Restricted
          </h2>
          <p style={{ color: '#7b3b3b' }}>
            Only Micro-Influencer accounts can access the requests page.
          </p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${API_URL}/api/data/${user.id}`);
      const userData = await response.json();
      setRequests(userData.requests || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      const request = requests.find(req => req.id === requestId);
      
      // Update influencer's data - move request to partnerships
      const updatedUser = {
        ...user,
        requests: requests.filter(req => req.id !== requestId),
        partnerships: [...(user.partnerships || []), {
          ...request,
          status: 'connected',
          acceptedAt: new Date().toISOString()
        }]
      };

      await fetch(`${API_URL}/api/data/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: updatedUser })
      });

      // Update business user's partnerships as well
      const businessResponse = await fetch(`${API_URL}/api/data/${request.businessId}`);
      const businessData = await businessResponse.json();
      
      const updatedBusiness = {
        ...businessData,
        partnerships: [...(businessData.partnerships || []), {
          influencerId: user.id,
          influencerName: `${user.profile.firstName} ${user.profile.lastName}`,
          influencerEmail: user.email,
          influencerProfile: user.profile,
          status: 'connected',
          acceptedAt: new Date().toISOString()
        }]
      };

      await fetch(`${API_URL}/api/data/${request.businessId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: updatedBusiness })
      });

      // Show success notification
      setNotification({
        type: 'success',
        message: `Congrats! You have matched with @${request.businessName}!`,
        details: `@${request.businessName} will notify you via email with further details`
      });

      // Refresh requests
      fetchRequests();

      // Hide notification after 5 seconds
      setTimeout(() => setNotification(null), 5000);

    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      const updatedRequests = requests.filter(req => req.id !== requestId);
      
      const updatedUser = {
        ...user,
        requests: updatedRequests
      };

      await fetch(`${API_URL}/api/data/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: updatedUser })
      });

      setRequests(updatedRequests);
    } catch (error) {
      console.error('Error declining request:', error);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e1f3f4' }}>
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-8 z-50">
          <div 
            className="p-4 rounded-lg shadow-lg border-2 max-w-sm"
            style={{ 
              backgroundColor: '#f9f2e0',
              borderColor: '#c4b590'
            }}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
                🔔
              </div>
              <div className="flex-1">
                <p className="font-semibold" style={{ color: '#7b3b3b' }}>
                  {notification.message}
                </p>
                <p className="text-sm mt-1" style={{ color: '#7b3b3b' }}>
                  {notification.details}
                </p>
              </div>
              <button 
                onClick={() => setNotification(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="px-12 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div 
                className="h-1 flex-1 max-w-32"
                style={{ backgroundColor: '#7b3b3b' }}
              ></div>
              <h1 
                className="text-4xl font-bold mx-8"
                style={{ color: '#7b3b3b' }}
              >
                Requests
              </h1>
              <div 
                className="h-1 flex-1 max-w-32"
                style={{ backgroundColor: '#7b3b3b' }}
              ></div>
            </div>
            <p 
              className="text-xl"
              style={{ color: '#7b3b3b' }}
            >
              View businesses that have connected with you
            </p>
          </div>

          {/* Requests List */}
          <div 
            className="p-8 rounded-lg border-2"
            style={{ 
              backgroundColor: '#f9f2e0',
              borderColor: '#c4b590'
            }}
          >
            {requests.length === 0 ? (
              <div className="text-center py-12">
                <p 
                  className="text-xl"
                  style={{ color: '#7b3b3b' }}
                >
                  No pending requests at the moment.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {requests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between py-4 border-b border-gray-300 last:border-b-0">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center text-sm font-semibold"
                        style={{ backgroundColor: '#b9d7d9', color: '#7b3b3b' }}
                      >
                        Profile
                      </div>
                      <div>
                        <h3 
                          className="text-lg font-semibold"
                          style={{ color: '#7b3b3b' }}
                        >
                          {request.businessName}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowModal(true);
                        }}
                        className="underline hover:opacity-80"
                        style={{ color: '#7b3b3b' }}
                      >
                        Information
                      </button>
                      
                      <Button
                        onClick={() => handleAccept(request.id)}
                        className="px-6 py-2 rounded-full text-white font-medium"
                        style={{ backgroundColor: '#b9d7d9', color: '#7b3b3b' }}
                      >
                        Accept
                      </Button>
                      
                      <Button
                        onClick={() => handleDecline(request.id)}
                        className="px-6 py-2 rounded-full text-white font-medium"
                        style={{ backgroundColor: '#7b3b3b' }}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Information Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className="p-8 rounded-lg max-w-md w-full mx-4 relative"
            style={{ backgroundColor: '#f9f2e0' }}
          >
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            
            <h3 
              className="text-2xl font-semibold mb-6 text-center border-b-2 pb-2"
              style={{ 
                color: '#7b3b3b',
                borderColor: '#7b3b3b'
              }}
            >
              Information:
            </h3>
            
            <div className="space-y-4" style={{ color: '#7b3b3b' }}>
              <div>
                <strong>Bio</strong>
                <div className="border-b-2 border-current mt-1 mb-2"></div>
                <div className="border-b-2 border-current mb-2"></div>
                <div className="border-b-2 border-current mb-4 w-3/4"></div>
              </div>
              
              <div>
                <strong>Age (optional):</strong> {selectedRequest.businessProfile?.age || 'Not specified'}
              </div>
              
              <div>
                <strong>Location (optional):</strong> {selectedRequest.businessProfile?.location || 'Not specified'}
              </div>
              
              <div>
                <strong>Gender (optional):</strong> {selectedRequest.businessProfile?.gender || 'Not specified'}
              </div>
              
              <div>
                <strong>Target audience:</strong> {selectedRequest.businessProfile?.targetAudience || 'Not specified'}
              </div>
              
              <div>
                <strong>Product Focus:</strong> {selectedRequest.businessProfile?.productFocus || 'Not specified'}
              </div>
              
              <div>
                <strong>Brand values:</strong> {selectedRequest.businessProfile?.brandValues || 'Not specified'}
              </div>
              
              <div>
                <strong>Pricing range:</strong> {selectedRequest.businessProfile?.pricing || 'Not specified'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
