"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "../context/AuthContext"
import Button from "../components/Button"
import Input from "../components/Input"
import { X, User, PlusCircle, Edit3, Trash2 } from "lucide-react"
import AddInfluencerModal from "../components/AddInfluencerModal"

export default function Explore() {
  const { user, API_URL, updateProfile, updateUser } = useAuth()
  const [influencers, setInfluencers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedInfluencer, setSelectedInfluencer] = useState(null)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showAddEditModal, setShowAddEditModal] = useState(false)
  const [editingInfluencer, setEditingInfluencer] = useState(null)
  const [notification, setNotification] = useState(null)
  const [loadingInfluencers, setLoadingInfluencers] = useState(true)

  const fetchInfluencers = useCallback(async () => {
    setLoadingInfluencers(true)
    try {
      const response = await fetch(`${API_URL}/api/data`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const allData = await response.json()

      const influencerAccounts = Object.values(allData)
        .map((item) => item.data)
        .filter((value) => value.userType === "influencer" && value.profile)
        .map((value) => ({
          id: value.id,
          ...value,
          profile: value.profile || {},
        }))

      setInfluencers(influencerAccounts)
    } catch (error) {
      console.error("Error fetching influencers:", error)
      setInfluencers([])
    } finally {
      setLoadingInfluencers(false)
    }
  }, [API_URL])

  useEffect(() => {
    fetchInfluencers()
  }, [fetchInfluencers])

  if (!user || user.userType !== "business") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#e1f3f4" }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#7b3b3b" }}>
            Access Restricted
          </h2>
          <p style={{ color: "#7b3b3b" }}>Only Small Business accounts can access the search feature.</p>
        </div>
      </div>
    )
  }

  const handleConnect = async (influencerId) => {
    try {
      const influencer = influencers.find((inf) => inf.id === influencerId)
      if (!influencer) {
        console.error("Influencer not found for connection:", influencerId)
        return
      }

      // 1. Update influencer's requests (still pending for them to accept)
      const updatedInfluencer = {
        ...influencer,
        requests: [
          ...(influencer.requests || []),
          {
            id: Date.now(),
            businessId: user.id,
            businessName: `${user.profile.firstName} ${user.profile.lastName}`,
            businessEmail: user.email,
            businessProfile: user.profile,
            status: "pending",
            createdAt: new Date().toISOString(),
          },
        ],
      }

      const influencerUpdateResponse = await fetch(`${API_URL}/api/data/${influencerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: updatedInfluencer }),
      })

      if (!influencerUpdateResponse.ok) {
        const errorText = await influencerUpdateResponse.text()
        throw new Error(
          `Failed to send connection request to influencer: ${influencerUpdateResponse.status} - ${errorText}`,
        )
      }

      // 2. Update business user's partnerships (immediately set to 'connected' as per user request)
      const newPartnership = {
        id: Date.now() + 1,
        influencerId: influencer.id,
        influencerName: `${influencer.profile.firstName} ${influencer.profile.lastName}`,
        influencerEmail: influencer.email,
        influencerProfile: influencer.profile,
        status: "connected", // Set to 'connected' immediately for the business user
        requestedAt: new Date().toISOString(),
      }

      const updatedBusinessUser = {
        ...user,
        partnerships: [...(user.partnerships || []), newPartnership],
      }

      await updateUser(updatedBusinessUser)

      setNotification({
        type: "success",
        message: `You've connected with @${influencer.profile.firstName || "Micro-Influencer"}!`,
        details: "View connection status in your profile.",
      })

      fetchInfluencers()
      setTimeout(() => setNotification(null), 5000)
    } catch (error) {
      console.error("Error connecting:", error)
      setNotification({
        type: "error",
        message: "Failed to send connection request.",
        details: error.message,
      })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const handleDeleteInfluencer = async (influencerId) => {
    if (!window.confirm("Are you sure you want to delete this influencer?")) return
    try {
      const response = await fetch(`${API_URL}/api/data/${influencerId}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to delete influencer: ${response.status} - ${errorText}`)
      }
      setNotification({
        type: "success",
        message: "Influencer deleted successfully!",
        details: "",
      })
      fetchInfluencers()
      setTimeout(() => setNotification(null), 3000)
    } catch (error) {
      console.error("Error deleting influencer:", error)
      setNotification({
        type: "error",
        message: "Failed to delete influencer.",
        details: error.message,
      })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const handleEditInfluencer = (influencer) => {
    setEditingInfluencer(influencer)
    setShowAddEditModal(true)
  }

  const handleAddInfluencerClick = () => {
    setEditingInfluencer(null)
    setShowAddEditModal(true)
  }

  const handleModalClose = () => {
    setShowAddEditModal(false)
    setEditingInfluencer(null)
  }

  const handleInfluencerAddedOrUpdated = () => {
    fetchInfluencers()
    setSearchTerm("")
    handleModalClose()
  }

  const filteredInfluencers = influencers.filter((influencer) => {
    if (!searchTerm.trim()) {
      return influencer.profile && Object.keys(influencer.profile).length > 0
    }

    const profile = influencer.profile || {}
    const searchLower = searchTerm.toLowerCase()

    return (
      (profile.firstName || "").toLowerCase().includes(searchLower) ||
      (profile.lastName || "").toLowerCase().includes(searchLower) ||
      (profile.username || "").toLowerCase().includes(searchLower) ||
      (profile.niches || "").toLowerCase().includes(searchLower) ||
      (profile.location || "").toLowerCase().includes(searchLower) ||
      (profile.platform || "").toLowerCase().includes(searchLower) ||
      (profile.targetAudience || "").toLowerCase().includes(searchLower)
    )
  })

  const getPartnershipStatus = (influencerId) => {
    const partnership = user?.partnerships?.find((p) => p.influencerId === influencerId)
    return partnership ? partnership.status : null
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#e1f3f4" }}>
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-8 z-50">
          <div
            className="p-4 rounded-lg shadow-lg border-2 max-w-sm"
            style={{
              backgroundColor: notification.type === "success" ? "#d4edda" : "#f8d7da",
              borderColor: notification.type === "success" ? "#28a745" : "#dc3545",
              color: notification.type === "success" ? "#155724" : "#721c24",
            }}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">🔔</div>
              <div className="flex-1">
                <p className="font-semibold">{notification.message}</p>
                <p className="text-sm mt-1">{notification.details}</p>
              </div>
              <button onClick={() => setNotification(null)} className="text-gray-500 hover:text-gray-700">
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="px-12 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4" style={{ color: "#7b3b3b" }}>
              Discover Creators Built for Your Brand
            </h1>
            <p className="text-xl mb-8" style={{ color: "#7b3b3b" }}>
              Just search, select, and start growing.
            </p>

            {/* Search Bar and Add Influencer Button */}
            <div className="max-w-4xl mx-auto flex gap-4 items-center">
              <Input
                type="text"
                placeholder="Search (niche, location, platform, username, target audience)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-6 py-4 text-lg rounded-lg"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#b9d7d9",
                }}
              />
              <Button
                onClick={handleAddInfluencerClick}
                className="px-6 py-4 rounded-full text-white font-medium flex items-center gap-2"
                style={{ backgroundColor: "#7b3b3b" }}
              >
                <PlusCircle size={20} className="mr-2" />
                Add Influencer
              </Button>
            </div>
          </div>

          {/* Loading State */}
          {loadingInfluencers ? (
            <div className="text-center py-12">
              <div
                className="border-4 border-gray-200 border-t-4 border-t-brown-dark rounded-full w-10 h-10 animate-spin mx-auto mb-4"
                style={{ borderColor: "rgba(0, 0, 0, 0.1)", borderTopColor: "#7b3b3b" }}
              ></div>
              <p className="text-xl" style={{ color: "#7b3b3b" }}>
                Loading influencers...
              </p>
            </div>
          ) : filteredInfluencers.length === 0 && searchTerm.trim() ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#7b3b3b" }}>
                No influencers found
              </h2>
              <p className="text-xl" style={{ color: "#7b3b3b" }}>
                Try adjusting your search terms.
              </p>
            </div>
          ) : filteredInfluencers.length === 0 && !searchTerm.trim() ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#7b3b3b" }}>
                No micro-influencers have created profiles yet.
              </h2>
              <p className="text-xl mb-4" style={{ color: "#7b3b3b" }}>
                Start by adding your first micro-influencer!
              </p>
              <Button
                onClick={handleAddInfluencerClick}
                className="px-6 py-4 rounded-full text-white font-medium flex items-center gap-2"
                style={{ backgroundColor: "#7b3b3b" }}
              >
                <PlusCircle size={20} className="mr-2" />
                Add Your First Influencer
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-8">
              {filteredInfluencers.map((influencer) => (
                <div
                  key={influencer.id}
                  className="rounded-lg overflow-hidden shadow-md transition-transform duration-200 hover:scale-[1.02]"
                  style={{ backgroundColor: "#b9d7d9" }}
                >
                  {/* Profile Section */}
                  <div className="p-6 text-center">
                    {/* Profile Picture */}
                    {influencer.profile?.profilePicture ? (
                      <div className="w-full h-[180px] overflow-hidden relative">
                        <img
                          src={influencer.profile.profilePicture || "/placeholder.svg"}
                          alt={`${influencer.profile?.firstName} ${influencer.profile?.lastName}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = "/diverse-influencer-profile.png"
                          }}
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-full h-[180px] flex items-center justify-center text-6xl font-bold"
                        style={{ backgroundColor: "#f9f2e0", color: "#7b3b3b" }}
                      >
                        <User size={64} />
                      </div>
                    )}

                    <h3 className="text-lg font-semibold mt-4 mb-2" style={{ color: "#7b3b3b" }}>
                      {influencer.profile?.firstName && influencer.profile?.lastName
                        ? `${influencer.profile.firstName} ${influencer.profile.lastName}`
                        : "Micro-Influencer"}
                    </h3>
                    {influencer.profile?.username && (
                      <p className="text-sm mb-2" style={{ color: "#7b3b3b" }}>
                        @{influencer.profile.username}
                      </p>
                    )}
                    <p className="text-sm mb-4" style={{ color: "#7b3b3b" }}>
                      {influencer.profile?.targetAudience || "No target audience specified."}
                    </p>

                    <div className="flex justify-center gap-3 mb-4">
                      <button
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        onClick={() => handleEditInfluencer(influencer)}
                        title="Edit Influencer"
                        style={{ color: "#7b3b3b" }}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-red-100 transition-colors"
                        onClick={() => handleDeleteInfluencer(influencer.id)}
                        title="Delete Influencer"
                        style={{ color: "#dc3545" }}
                      >
                        <Trash2 size={16} />
                      </button>
                      {(() => {
                        const currentPartnershipStatus = getPartnershipStatus(influencer.id)

                        return (
                          <Button
                            onClick={() => handleConnect(influencer.id)}
                            className="px-4 py-2 rounded-full text-white font-medium text-sm"
                            style={{
                              backgroundColor:
                                currentPartnershipStatus === "connected"
                                  ? "#7b3b3b"
                                  : currentPartnershipStatus === "pending"
                                    ? "#b9d7d9"
                                    : "#2a2829",
                              color: currentPartnershipStatus === "pending" ? "#7b3b3b" : "#ffffff",
                            }}
                            disabled={currentPartnershipStatus !== null}
                          >
                            {currentPartnershipStatus === "connected"
                              ? "CONNECTED"
                              : currentPartnershipStatus === "pending"
                                ? "PENDING"
                                : "CONNECT"}
                          </Button>
                        )
                      })()}
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-4 text-white" style={{ backgroundColor: "#7b3b3b" }}>
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="font-semibold">Platform:</span> {influencer.profile?.platform || "N/A"}
                      </div>
                      <div>
                        <span className="font-semibold">Followers:</span> {influencer.profile?.followerCount || "N/A"}
                      </div>
                      <div>
                        <span className="font-semibold">Niche(s):</span> {influencer.profile?.niches || "N/A"}
                      </div>
                      <div>
                        <span className="font-semibold">Pricing:</span> {influencer.profile?.pricingRange || "N/A"}
                      </div>
                      <button
                        onClick={() => {
                          setSelectedInfluencer(influencer)
                          setShowInfoModal(true)
                        }}
                        className="underline hover:opacity-80"
                      >
                        Other Info
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Other Information Modal */}
      {showInfoModal && selectedInfluencer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-8 rounded-lg max-w-md w-full mx-4 relative" style={{ backgroundColor: "#f9f2e0" }}>
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h3
              className="text-2xl font-semibold mb-6 text-center border-b-2 pb-2"
              style={{
                color: "#7b3b3b",
                borderColor: "#7b3b3b",
              }}
            >
              Other Information:
            </h3>

            <div className="space-y-4" style={{ color: "#7b3b3b" }}>
              <div>
                <strong>Targeted Audience</strong>
                {selectedInfluencer.profile?.targetAudience ? (
                  <p className="mt-2 p-2 bg-white rounded border">{selectedInfluencer.profile.targetAudience}</p>
                ) : (
                  <div>
                    <div className="border-b-2 border-current mt-1 mb-2"></div>
                    <div className="border-b-2 border-current mb-2"></div>
                    <div className="border-b-2 border-current mb-4 w-3/4"></div>
                  </div>
                )}
              </div>

              <div>
                <strong>Age (optional):</strong> {selectedInfluencer.profile?.age || "Not specified"}
              </div>

              <div>
                <strong>Location (optional):</strong> {selectedInfluencer.profile?.location || "Not specified"}
              </div>

              <div>
                <strong>Gender (optional):</strong> {selectedInfluencer.profile?.gender || "Not specified"}
              </div>

              <div>
                <strong>Niche(s):</strong> {selectedInfluencer.profile?.niches || "Not specified"}
              </div>

              <div>
                <strong>Pricing range:</strong> {selectedInfluencer.profile?.pricingRange || "Not specified"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Influencer Modal */}
      {showAddEditModal && (
        <AddInfluencerModal
          onClose={handleModalClose}
          onInfluencerAdded={handleInfluencerAddedOrUpdated}
          API_URL={API_URL}
          influencer={editingInfluencer}
        />
      )}
    </div>
  )
}
