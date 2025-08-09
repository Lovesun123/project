const express = require("express")
const cors = require("cors")
const Redis = require("ioredis")

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Redis connection
// IMPORTANT: For local development, ensure Redis is running or use a service like Upstash.
// For deployment, set the REDIS_URL environment variable.
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

// Seed data for 20 micro-influencers
const seedInfluencers = [
  {
    id: "influencer_1",
    email: "ava.moretti.beauty@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Ava",
      lastName: "Moretti",
      bio: "Clean girl aesthetic ✨ Skincare tips & no-makeup makeup",
      profilePicture: "/beauty-influencer.png",
      age: "26",
      location: "Los Angeles, CA",
      gender: "Female",
      platform: "Instagram",
      followerCount: "5.2%", // Assuming this is engagement rate, but storing as followerCount for consistency with schema
      niches: "Clean beauty, Minimalist skincare",
      pricingRange: "$75-$110/post",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_2",
    email: "miabeautytok@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Mia",
      lastName: "Nakamura",
      bio: "Glow-up routines, K-beauty hauls & face mask reviews",
      profilePicture: "/mia-nakamura-kbeauty-influencer.png",
      age: "24",
      location: "Seattle, WA",
      gender: "Female",
      platform: "TikTok",
      followerCount: "6.1%",
      niches: "Korean skincare, Sheet masks",
      pricingRange: "$85-$120/video",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_3",
    email: "julian.skin.reviews@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Julian",
      lastName: "Reyes",
      bio: "Helping guys build simple skincare routines",
      profilePicture: "/julian-reyes-grooming.png",
      age: "28",
      location: "Miami, FL",
      gender: "Male",
      platform: "YouTube",
      followerCount: "4.3%",
      niches: "Men’s skincare, Grooming",
      pricingRange: "$110-$150/video",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_4",
    email: "sierra.blake.beauty@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Sierra",
      lastName: "Blake",
      bio: "Shade matching expert 🎨 Affordable & inclusive finds",
      profilePicture: "/makeup-influencer.png",
      age: "27",
      location: "Atlanta, GA",
      gender: "Female",
      platform: "Instagram",
      followerCount: "5.5%",
      niches: "Melanin-rich foundation, Makeup reviews",
      pricingRange: "$70-$100/post",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_5",
    email: "kaylaortiz.glam@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Kayla",
      lastName: "Ortiz",
      bio: "Latina-owned lip faves 💄 Color swatches & reviews",
      profilePicture: "/kayla-ortiz-lip-influencer.png",
      age: "23",
      location: "San Antonio, TX",
      gender: "Female",
      platform: "TikTok",
      followerCount: "6.3%",
      niches: "Lip gloss, Lipstick swatches",
      pricingRange: "$80-$110/video",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_6",
    email: "emmafields.naturals@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Emma",
      lastName: "Fields",
      bio: "Acne-prone skin, tried everything 🌿 DIY & indie beauty",
      profilePicture: "/emma-fields-influencer.png",
      age: "29",
      location: "Denver, CO",
      gender: "Female",
      platform: "YouTube",
      followerCount: "5.0%",
      niches: "DIY skincare, Natural products",
      pricingRange: "$100-$140/video",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_7",
    email: "marcusgroomschi@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Marcus",
      lastName: "Dale",
      bio: "Clean cuts & clean skin ✂️ Male grooming for the everyday man",
      profilePicture: "/male-grooming-influencer.png",
      age: "30",
      location: "Chicago, IL",
      gender: "Male",
      platform: "Instagram",
      followerCount: "4.6%",
      niches: "Beard oils, Grooming kits",
      pricingRange: "$70-$90/post",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_8",
    email: "zoeacnebeauty@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Zoe",
      lastName: "Tran",
      bio: "GRWM with acne-safe hacks 💡 Breakout-proof beauty",
      profilePicture: "/zoe-tran-acne-influencer.png",
      age: "22",
      location: "Orange County, CA",
      gender: "Female",
      platform: "TikTok",
      followerCount: "6.8%",
      niches: "Acne-safe makeup, Product layering",
      pricingRange: "$85-$110/video",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_9",
    email: "hailey.brooks.glam@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Hailey",
      lastName: "Brooks",
      bio: "Budget glam 💋 Dupes that actually work",
      profilePicture: "/budget-beauty-influencer.png",
      age: "25",
      location: "Nashville, TN",
      gender: "Female",
      platform: "Instagram",
      followerCount: "5.9%",
      niches: "Drugstore dupes, Beauty on a budget",
      pricingRange: "$70-$100/post",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_10",
    email: "lenawhitebeauty@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Lena",
      lastName: "White",
      bio: "Conscious glam 💚 Cruelty-free is the new luxury",
      profilePicture: "/lena-white-vegan-influencer.png",
      age: "30",
      location: "Portland, OR",
      gender: "Female",
      platform: "YouTube",
      followerCount: "4.9%",
      niches: "Vegan beauty, Cruelty-free brands",
      pricingRange: "$95-$125/video",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_11",
    email: "noahjamesbeauty@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Noah",
      lastName: "James",
      bio: "Scent + skin care = confidence boost",
      profilePicture: "/placeholder.svg?height=100&width=100",
      age: "26",
      location: "Brooklyn, NY",
      gender: "Male",
      platform: "TikTok",
      followerCount: "5.3%",
      niches: "Fragrance layering, Skincare",
      pricingRange: "$80-$100/video",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_12",
    email: "rileysunbeauty@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Riley",
      lastName: "Bennett",
      bio: "Hot-weather beauty ☀️ SPF-tested looks",
      profilePicture: "/placeholder.svg?height=100&width=100",
      age: "24",
      location: "Phoenix, AZ",
      gender: "Female",
      platform: "Instagram",
      followerCount: "6.1%",
      niches: "SPF makeup, Summer beauty",
      pricingRange: "$70-$90/post",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_13",
    email: "ethan.glow.tx@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Ethan",
      lastName: "Price",
      bio: "Retinol, serums & real talk for guys",
      profilePicture: "/placeholder.svg?height=100&width=100",
      age: "29",
      location: "Austin, TX",
      gender: "Male",
      platform: "YouTube",
      followerCount: "4.7%",
      niches: "Men’s nighttime skincare",
      pricingRange: "$100-$130/video",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_14",
    email: "brihalllashes@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Brianna",
      lastName: "Hall",
      bio: "Lash lover 🖤 Testing every mascara on the market",
      profilePicture: "/placeholder.svg?height=100&width=100",
      age: "23",
      location: "Charlotte, NC",
      gender: "Female",
      platform: "TikTok",
      followerCount: "6.2%",
      niches: "Lash growth, Mascara tests",
      pricingRange: "$75-$100/video",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_15",
    email: "jasminebrows.mi@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Jasmine",
      lastName: "Ali",
      bio: "Brow queen 👑 Tutorials, tools & product tests",
      profilePicture: "/placeholder.svg?height=100&width=100",
      age: "27",
      location: "Detroit, MI",
      gender: "Female",
      platform: "Instagram",
      followerCount: "5.6%",
      niches: "Eyebrow shaping, Brow pens",
      pricingRange: "$70-$95/post",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_16",
    email: "nicolegarcia.glam@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Nicole",
      lastName: "Garcia",
      bio: "Reviewing small Latina-owned brands ❤️",
      profilePicture: "/placeholder.svg?height=100&width=100",
      age: "28",
      location: "Tampa, FL",
      gender: "Female",
      platform: "YouTube",
      followerCount: "5.0%",
      niches: "Latina beauty brands",
      pricingRange: "$100-$130/video",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_17",
    email: "calebskinmn@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Caleb",
      lastName: "Harris",
      bio: "Keeping your glow barrier strong 🧴",
      profilePicture: "/placeholder.svg?height=100&width=100",
      age: "30",
      location: "Minneapolis, MN",
      gender: "Male",
      platform: "Instagram",
      followerCount: "4.4%",
      niches: "Moisturizers, Skin-barrier care",
      pricingRange: "$65-$85/post",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_18",
    email: "niaglowbaltimore@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Nia",
      lastName: "Robinson",
      bio: "Bold eyes, bold vibes 🎨 Palette swatches & looks",
      profilePicture: "/placeholder.svg?height=100&width=100",
      age: "25",
      location: "Baltimore, MD",
      gender: "Female",
      platform: "TikTok",
      followerCount: "6.7%",
      niches: "Colorful eye looks, Palettes",
      pricingRange: "$85-$100/video",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_19",
    email: "jordanleeskin@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Jordan",
      lastName: "Lee",
      bio: "Skincare for everyone 🌈 Honest ingredient talk",
      profilePicture: "/placeholder.svg?height=100&width=100",
      age: "26",
      location: "Sacramento, CA",
      gender: "Non-binary",
      platform: "YouTube",
      followerCount: "4.8%",
      niches: "Unisex skincare, Sensitive skin",
      pricingRange: "$95-$120/video",
    },
    partnerships: [],
    requests: [],
  },
  {
    id: "influencer_20",
    email: "taymonroe.glow@gmail.com",
    userType: "influencer",
    profile: {
      firstName: "Taylor",
      lastName: "Monroe",
      bio: "Everything dewy 💖 Highlighters & glowy skin",
      profilePicture: "/placeholder.svg?height=100&width=100",
      age: "25",
      location: "Boston, MA",
      gender: "Female",
      platform: "Instagram",
      followerCount: "5.3%",
      niches: "Blush, Highlighter, Glow products",
      pricingRange: "$75-$95/post",
    },
    partnerships: [],
    requests: [],
  },
]

// Function to initialize the database with seed data if empty
async function initializeDatabase() {
  try {
    const keys = await redis.keys("*")
    if (keys.length === 0) {
      console.log("Database is empty. Seeding with influencer data...")
      for (const influencer of seedInfluencers) {
        await redis.set(influencer.id, JSON.stringify(influencer))
        console.log(`Seeded influencer: ${influencer.profile.firstName} ${influencer.profile.lastName}`)
      }
      console.log("Database seeding complete.")
    } else {
      console.log("Database already contains data. Skipping seeding.")
    }
  } catch (error) {
    console.error("Error initializing database:", error)
  }
}

// CRUD Operations - HTTP Requests:

// READ: Fetch all data items (HTTP GET)
// GET /api/data - Retrieves all items from the database
app.get("/api/data", async (req, res) => {
  try {
    const keys = await redis.keys("*")
    const data = {}

    for (const key of keys) {
      const value = await redis.get(key)
      if (value) {
        try {
          data[key] = JSON.parse(value)
        } catch (parseError) {
          console.error(`Error parsing JSON for key ${key}:`, parseError)
          // Optionally, delete malformed data or handle it differently
        }
      }
    }

    console.log("Fetched all data keys:", Object.keys(data)) // Debug log
    res.json(data)
  } catch (error) {
    console.error("Error fetching all data:", error)
    res.status(500).json({ error: "Failed to fetch all data" })
  }
})

// READ: Fetch single data item (HTTP GET)
// GET /api/data/:id - Retrieves a single item by ID
app.get("/api/data/:id", async (req, res) => {
  try {
    const { id } = req.params
    const value = await redis.get(id)

    if (!value) {
      console.log(`Item with ID ${id} not found.`) // Debug log
      return res.status(404).json({ error: "Item not found" })
    }

    console.log(`Fetched item with ID ${id}.`) // Debug log
    res.json(JSON.parse(value))
  } catch (error) {
    console.error(`Error fetching item ${req.params.id}:`, error)
    res.status(500).json({ error: "Failed to fetch item" })
  }
})

// CREATE: Add new data item (HTTP POST)
// POST /api/data - Creates a new item in the database
app.post("/api/data", async (req, res) => {
  try {
    const { id, data } = req.body

    if (!id || !data) {
      return res.status(400).json({ error: "ID and data are required" })
    }

    await redis.set(id, JSON.stringify(data))

    console.log("Data saved successfully:", { id, data: JSON.stringify(data).substring(0, 100) + "..." }) // Log truncated data
    res.json({ success: true, message: "Data saved successfully" })
  } catch (error) {
    console.error("Error creating item:", error)
    res.status(500).json({ error: "Failed to create item" })
  }
})

// UPDATE: Modify existing data item (HTTP PUT)
// PUT /api/data/:id - Updates an existing item by ID in the database
app.put("/api/data/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { data } = req.body

    if (!data) {
      return res.status(400).json({ error: "Data is required" })
    }

    // Check if item exists
    const existingValue = await redis.get(id)
    if (!existingValue) {
      console.log(`Item with ID ${id} not found for update.`) // Debug log
      return res.status(404).json({ error: "Item not found" })
    }

    await redis.set(id, JSON.stringify(data))

    console.log("Data updated successfully:", { id, data: JSON.stringify(data).substring(0, 100) + "..." }) // Log truncated data
    res.json({ success: true, message: "Data updated successfully" })
  } catch (error) {
    console.error("Error updating item:", error)
    res.status(500).json({ error: "Failed to update item" })
  }
})

// DELETE: Remove data item (HTTP DELETE)
// DELETE /api/data/:id - Deletes an item by ID from the database
app.delete("/api/data/:id", async (req, res) => {
  try {
    const { id } = req.params

    const result = await redis.del(id)

    if (result === 0) {
      console.log(`Item with ID ${id} not found for deletion.`) // Debug log
      return res.status(404).json({ error: "Item not found" })
    }

    console.log("Data deleted successfully:", { id })
    res.json({ success: true, message: "Data deleted successfully" })
  } catch (error) {
    console.error("Error deleting item:", error)
    res.status(500).json({ error: "Failed to delete item" })
  }
})

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" })
})

// Initialize database and then start server
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    console.log(`API endpoints available at http://localhost:${port}/api/data`)
  })
})
