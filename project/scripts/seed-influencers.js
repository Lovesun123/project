import Redis from "ioredis" // Changed from require('ioredis')

// Connect to Redis
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

const generateInfluencer = (index) => {
  const firstNames = [
    "Ava",
    "Liam",
    "Olivia",
    "Noah",
    "Emma",
    "Oliver",
    "Charlotte",
    "Elijah",
    "Amelia",
    "James",
    "Sophia",
    "Benjamin",
    "Isabella",
    "Lucas",
    "Mia",
    "Henry",
    "Evelyn",
    "Alexander",
    "Harper",
    "Michael",
  ]
  const lastNames = [
    "Smith",
    "Jones",
    "Williams",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor",
    "Anderson",
    "Thomas",
    "Jackson",
    "White",
    "Harris",
    "Martin",
    "Thompson",
    "Garcia",
    "Martinez",
    "Robinson",
    "Clark",
  ]
  const platforms = ["Instagram", "TikTok", "YouTube", "Blog", "Facebook"]
  const niches = [
    "Skincare",
    "Makeup",
    "Haircare",
    "Nails",
    "Fragrance",
    "Clean Beauty",
    "Vegan Cosmetics",
    "Luxury Beauty",
    "Affordable Finds",
    "DIY Beauty",
  ]
  const locations = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
    "Austin",
    "Jacksonville",
    "Fort Worth",
    "Columbus",
    "Charlotte",
    "San Francisco",
    "Indianapolis",
    "Seattle",
    "Denver",
    "Washington",
  ]
  const bios = [
    "Passionate about natural skincare and sustainable beauty. Sharing my journey to glowing skin!",
    "Makeup artist and beauty enthusiast. Love creating bold looks and reviewing new products.",
    "Your go-to for honest reviews on haircare products and styling tips for healthy locks.",
    "Exploring the world of clean beauty and sharing my favorite non-toxic finds.",
    "Dedicated to helping you find the best affordable makeup. Beauty on a budget!",
    "Luxury beauty aficionado. Unboxing and reviewing high-end skincare and cosmetics.",
    "Vegan beauty advocate. Discovering cruelty-free and plant-based products.",
    "From everyday glam to special occasion looks, I've got your makeup needs covered.",
    "Sharing my favorite DIY beauty recipes and natural remedies for healthy skin and hair.",
    "Obsessed with all things nails! From intricate designs to simple manicures, I share it all.",
    "Beauty is my passion! Join me for tutorials, product reviews, and beauty hacks.",
    "Helping you achieve your best skin with science-backed skincare routines.",
    "Exploring the latest trends in makeup and sharing my honest opinions.",
    "Hair transformation specialist. Follow for tips on growing and styling healthy hair.",
    "Your guide to ethical and sustainable beauty choices. Let's make a difference!",
    "Finding hidden gems in the beauty world. Affordable and effective products you need to try.",
    "Bringing you the best of luxury beauty without the fluff. Honest reviews only.",
    "From farm to face: my journey into natural and organic skincare.",
    "Mastering the art of makeup, one brush stroke at a time. Join my beauty community!",
    "All about that glow! Sharing my secrets for radiant skin and a healthy lifestyle.",
  ]

  const firstName = firstNames[index % firstNames.length]
  const lastName = lastNames[index % lastNames.length]
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@example.com`
  const userType = "influencer"
  const id = `${userType}_${Date.now() + index}` // Ensure unique ID

  return {
    id,
    email,
    userType,
    profile: {
      firstName,
      lastName,
      bio: bios[index % bios.length],
      profilePicture: `/placeholder.svg?height=100&width=100&query=${firstName}%20${lastName}%20portrait%20beauty%20influencer`,
      age: (20 + (index % 10)).toString(), // Age between 20-29
      location: locations[index % locations.length],
      gender: index % 2 === 0 ? "Female" : "Male",
      platform: platforms[index % platforms.length],
      followerCount: `${(Math.floor(Math.random() * 90) + 10) * 1000}`, // 10k-99k
      niches: niches[index % niches.length],
      pricingRange: `$${(Math.floor(Math.random() * 5) + 1) * 25}-${(Math.floor(Math.random() * 5) + 6) * 25}/post`, // $25-125/post
    },
    partnerships: [],
    requests: [],
  }
}

const seedInfluencers = async (count = 20) => {
  console.log(`Attempting to seed ${count} influencer profiles...`)
  try {
    for (let i = 0; i < count; i++) {
      const influencerData = generateInfluencer(i)
      await redis.set(influencerData.id, JSON.stringify(influencerData))
      console.log(
        `Seeded influencer: ${influencerData.profile.firstName} ${influencerData.profile.lastName} (${influencerData.id})`,
      )
    }
    console.log(`Successfully seeded ${count} influencer profiles.`)
  } catch (error) {
    console.error("Error seeding influencers:", error)
  } finally {
    redis.quit() // Close Redis connection
  }
}

seedInfluencers(20)
