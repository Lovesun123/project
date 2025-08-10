"use client"

import { useState, useEffect } from "react"
import Button from "./Button"
import Input from "./Input"
import Label from "./Label"
import { X, Save } from "lucide-react"

export default function AddInfluencerModal({ onClose, onInfluencerAdded, API_URL, influencer: editingInfluencer }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "", // Added username
    profilePicture: "",
    bio: "",
    age: "",
    location: "",
    gender: "",
    platform: "",
    followerCount: "",
    niches: "",
    pricingRange: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (editingInfluencer) {
      // Pre-fill form if editing an existing influencer
      setFormData({
        firstName: editingInfluencer.profile?.firstName || "",
        lastName: editingInfluencer.profile?.lastName || "",
        email: editingInfluencer.email || "",
        username: editingInfluencer.profile?.username || "", // Pre-fill username
        profilePicture: editingInfluencer.profile?.profilePicture || "",
        bio: editingInfluencer.profile?.bio || "",
        age: editingInfluencer.profile?.age || "",
        location: editingInfluencer.profile?.location || "",
        gender: editingInfluencer.profile?.gender || "",
        platform: editingInfluencer.profile?.platform || "",
        followerCount: editingInfluencer.profile?.followerCount || "",
        niches: editingInfluencer.profile?.niches || "",
        pricingRange: editingInfluencer.profile?.pricingRange || "",
      })
    } else {
      // Reset form for adding new influencer
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        username: "", // Reset username
        profilePicture: "",
        bio: "",
        age: "",
        location: "",
        gender: "",
        platform: "",
        followerCount: "",
        niches: "",
        pricingRange: "",
      })
    }
  }, [editingInfluencer])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const influencerData = {
        email: formData.email,
        userType: "influencer",
        profile: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username, // Include username in profile
          profilePicture: formData.profilePicture,
          bio: formData.bio,
          age: formData.age,
          location: formData.location,
          gender: formData.gender,
          platform: formData.platform,
          followerCount: formData.followerCount,
          niches: formData.niches,
          pricingRange: formData.pricingRange,
        },
        partnerships: editingInfluencer?.partnerships || [], // Preserve existing partnerships
        requests: editingInfluencer?.requests || [], // Preserve existing requests
      }

      let response
      if (editingInfluencer) {
        // Update existing influencer
        response = await fetch(`${API_URL}/api/data/${editingInfluencer.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: influencerData }),
        })
      } else {
        // Add new influencer
        const newId = `influencer_${Date.now()}` // Unique ID
        response = await fetch(`${API_URL}/api/data`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: newId, data: { ...influencerData, id: newId } }),
        })
      }

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(
          `Failed to ${editingInfluencer ? "update" : "add"} influencer: ${response.status} - ${errorText}`,
        )
      }

      setSuccess(true)
      onInfluencerAdded() // Callback to refresh the explore page
      setTimeout(() => {
        onClose() // Close modal after success
      }, 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="p-8 rounded-lg max-w-2xl w-full mx-4 relative overflow-y-auto max-h-[90vh]"
        style={{ backgroundColor: "#f9f2e0" }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>

        <h3
          className="text-2xl font-semibold mb-6 text-center border-b-2 pb-2"
          style={{
            color: "#7b3b3b",
            borderColor: "#7b3b3b",
          }}
        >
          {editingInfluencer ? "Edit Micro-Influencer" : "Add New Micro-Influencer"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="firstName" style={{ color: "#7b3b3b" }}>
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-2 border-2 rounded-md"
              style={{ borderColor: "#b9d7d9", backgroundColor: "#ffffff" }}
            />
          </div>
          <div>
            <Label htmlFor="lastName" style={{ color: "#7b3b3b" }}>
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-2 border-2 rounded-md"
              style={{ borderColor: "#b9d7d9", backgroundColor: "#ffffff" }}
            />
          </div>
          <div>
            <Label htmlFor="email" style={{ color: "#7b3b3b" }}>
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 border-2 rounded-md"
              style={{ borderColor: "#b9d7d9", backgroundColor: "#ffffff" }}
            />
          </div>
          <div>
            <Label htmlFor="username" style={{ color: "#7b3b3b" }}>
              Username
            </Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="e.g., @influencerhandle"
              className="mt-2 border-2 rounded-md"
              style={{ borderColor: "#b9d7d9", backgroundColor: "#ffffff" }}
            />
          </div>
          <div>
            <Label htmlFor="profilePicture" style={{ color: "#7b3b3b" }}>
              Profile Picture URL
            </Label>
            <Input
              id="profilePicture"
              name="profilePicture"
              type="url"
              value={formData.profilePicture}
              onChange={handleChange}
              placeholder="e.g., https://example.com/image.jpg"
              className="mt-2 border-2 rounded-md"
              style={{ borderColor: "#b9d7d9", backgroundColor: "#ffffff" }}
            />
          </div>
          <div>
            <Label htmlFor="bio" style={{ color: "#7b3b3b" }}>
              Bio
            </Label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about this influencer..."
              className="w-full h-24 p-3 border-2 rounded-md resize-none mt-2"
              style={{ borderColor: "#b9d7d9", backgroundColor: "#ffffff" }}
            />
          </div>
          <div>
            <Label htmlFor="age" style={{ color: "#7b3b3b" }}>
              Age (optional)
            </Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              className="mt-2 border-2 rounded-md"
              style={{ borderColor: "#b9d7d9", backgroundColor: "#ffffff" }}
            />
          </div>
          <div>
            <Label htmlFor="location" style={{ color: "#7b3b3b" }}>
              Location (optional)
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-2 border-2 rounded-md"
              style={{ borderColor: "#b9d7d9", backgroundColor: "#ffffff" }}
            />
          </div>
          <div>
            <Label htmlFor="gender" style={{ color: "#7b3b3b" }}>
              Gender (optional)
            </Label>
            <Input
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-2 border-2 rounded-md"
              style={{ borderColor: "#b9d7d9", backgroundColor: "#ffffff" }}
            />
          </div>
          <div>
            <Label htmlFor="platform" style={{ color: "#7b3b3b" }}>
              Platform
            </Label>
            <Input
              id="platform"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              required
              className="mt-2 border-2 rounded-md"
              style={{ borderColor: "#b9d7d9", backgroundColor: "#ffffff" }}
            />
          </div>
          <div>
            <Label htmlFor="followerCount" style={{ color: "#7b3b3b" }}>
              Follower Count
            </Label>
            <Input
              id="followerCount"
              name="followerCount"
              type="number"
              value={formData.followerCount}
              onChange={handleChange}
              required
              className="mt-2 border-2 rounded-md"
              style={{ borderColor: "#b9d7d9", backgroundColor: "#ffffff" }}
            />
          </div>
          <div>
            <Label htmlFor="niches" style={{ color: "#7b3b3b" }}>
              Niche(s)
            </Label>
            <Input
              id="niches"
              name="niches"
              value={formData.niches}
              onChange={handleChange}
              required
              placeholder="e.g., skincare, clean beauty, glam looks"
              className="mt-2 border-2 rounded-md"
              style={{ borderColor: "#b9d7d9", backgroundColor: "#ffffff" }}
            />
          </div>
          <div>
            <Label htmlFor="pricingRange" style={{ color: "#7b3b3b" }}>
              Pricing Range
            </Label>
            <Input
              id="pricingRange"
              name="pricingRange"
              value={formData.pricingRange}
              onChange={handleChange}
              required
              placeholder="e.g., '$25-$50/post'"
              className="mt-2 border-2 rounded-md"
              style={{ borderColor: "#b9d7d9", backgroundColor: "#ffffff" }}
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && (
            <p className="text-green-500 text-center">
              Influencer {editingInfluencer ? "updated" : "added"} successfully!
            </p>
          )}

          <div className="flex justify-center pt-4 gap-4">
            <Button
              type="button"
              onClick={onClose}
              className="px-8 py-2 rounded-full text-white font-medium"
              style={{ backgroundColor: "#b9d7d9", color: "#7b3b3b" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="px-8 py-2 rounded-full text-white font-medium"
              style={{ backgroundColor: "#7b3b3b" }}
            >
              <Save size={18} className="mr-2" />
              {loading
                ? editingInfluencer
                  ? "Updating..."
                  : "Adding..."
                : editingInfluencer
                  ? "Update Influencer"
                  : "Add Influencer"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
