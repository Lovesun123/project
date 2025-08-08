const cors = require('cors');
const Redis = require('ioredis');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Redis connection
// IMPORTANT: For local development, ensure Redis is running or use a service like Upstash.
// For deployment, set the REDIS_URL environment variable.
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// CRUD Operations - HTTP Requests:

// READ: Fetch all data items (HTTP GET)
// GET /api/data - Retrieves all items from the database
app.get('/api/data', async (req, res) => {
  try {
    const keys = await redis.keys('*');
    const data = {};
    
    for (const key of keys) {
      const value = await redis.get(key);
      if (value) {
        try {
          data[key] = JSON.parse(value);
        } catch (parseError) {
          console.error(`Error parsing JSON for key ${key}:`, parseError);
          // Optionally, delete malformed data or handle it differently
        }
      }
    }
    
    console.log('Fetched all data keys:', Object.keys(data)); // Debug log
    res.json(data);
  } catch (error) {
    console.error('Error fetching all data:', error);
    res.status(500).json({ error: 'Failed to fetch all data' });
  }
});

// READ: Fetch single data item (HTTP GET)
// GET /api/data/:id - Retrieves a single item by ID
app.get('/api/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const value = await redis.get(id);
    
    if (!value) {
      console.log(`Item with ID ${id} not found.`); // Debug log
      return res.status(404).json({ error: 'Item not found' });
    }
    
    console.log(`Fetched item with ID ${id}.`); // Debug log
    res.json(JSON.parse(value));
  } catch (error) {
    console.error(`Error fetching item ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

// CREATE: Add new data item (HTTP POST)
// POST /api/data - Creates a new item in the database
app.post('/api/data', async (req, res) => {
  try {
    const { id, data } = req.body;
    
    if (!id || !data) {
      return res.status(400).json({ error: 'ID and data are required' });
    }
    
    await redis.set(id, JSON.stringify(data));
    
    console.log('Data saved successfully:', { id, data: JSON.stringify(data).substring(0, 100) + '...' }); // Log truncated data
    res.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// UPDATE: Modify existing data item (HTTP PUT)
// PUT /api/data/:id - Updates an existing item by ID in the database
app.put('/api/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    
    if (!data) {
      return res.status(400).json({ error: 'Data is required' });
    }
    
    // Check if item exists
    const existingValue = await redis.get(id);
    if (!existingValue) {
      console.log(`Item with ID ${id} not found for update.`); // Debug log
      return res.status(404).json({ error: 'Item not found' });
    }
    
    await redis.set(id, JSON.stringify(data));
    
    console.log('Data updated successfully:', { id, data: JSON.stringify(data).substring(0, 100) + '...' }); // Log truncated data
    res.json({ success: true, message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// DELETE: Remove data item (HTTP DELETE)
// DELETE /api/data/:id - Deletes an item by ID from the database
app.delete('/api/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await redis.del(id);
    
    if (result === 0) {
      console.log(`Item with ID ${id} not found for deletion.`); // Debug log
      return res.status(404).json({ error: 'Item not found' });
    }
    
    console.log('Data deleted successfully:', { id });
    res.json({ success: true, message: 'Data deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`API endpoints available at http://localhost:${port}/api/data`);
});

