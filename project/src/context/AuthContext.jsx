"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const API_URL = import.meta.env.VITE_RAILWAY_API_URL || "http://localhost:3001"

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const savedUser = localStorage.getItem("micromatch_user")
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser)
        try {
          const response = await fetch(`${API_URL}/api/data/${parsedUser.id}`)
          if (response.ok) {
            const latestUserData = await response.json()
            setUser(latestUserData)
            console.log("User reloaded from backend:", latestUserData)
          } else {
            console.warn("Failed to fetch latest user data from backend, using local storage:", parsedUser)
            setUser(parsedUser)
          }
        } catch (error) {
          console.error("Error re-fetching user data on load:", error)
          setUser(parsedUser)
        }
      }
      setLoading(false)
    }

    loadUserFromStorage()
  }, [])

  const login = async (email, password, userType) => {
    try {
      console.log("Attempting login for:", email, userType)

      const response = await fetch(`${API_URL}/api/data`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const allData = await response.json()

      const existingUser = Object.values(allData).find((value) => value.email === email && value.userType === userType)

      if (existingUser) {
        console.log("User found:", existingUser)
        setUser(existingUser)
        localStorage.setItem("micromatch_user", JSON.stringify(existingUser))
        return { success: true }
      } else {
        console.log("User not found, attempting signup.")
        return await signup(email, password, userType)
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: error.message }
    }
  }

  const signup = async (email, password, userType) => {
    try {
      console.log("Creating new user:", email, userType)

      const userData = {
        id: `${userType}_${Date.now()}`,
        email,
        userType,
        profile: {
          firstName: "",
          lastName: "",
          profilePicture: "",
          age: "",
          location: "",
          gender: "",
          // Conditional fields based on userType
          ...(userType === "business" && {
            bio: "", // Bio for business users
            plan: "Free",
            targetAudience: "", // This was previously here for business, but user wants it for influencer
            productFocus: "",
            brandValues: "",
            pricing: "",
          }),
          ...(userType === "influencer" && {
            username: "", // Added username for influencers
            targetAudience: "", // Targeted Audience for influencer users
            platform: "",
            followerCount: "",
            niches: "",
            pricingRange: "",
          }),
        },
        partnerships: [],
        requests: [],
      }

      console.log("Saving user data to API:", userData)
      const saveResponse = await fetch(`${API_URL}/api/data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userData.id,
          data: userData,
        }),
      })

      if (!saveResponse.ok) {
        const errorText = await saveResponse.text()
        throw new Error(`Failed to save user data: ${saveResponse.status} - ${errorText}`)
      }

      console.log("User saved successfully to backend.")
      setUser(userData)
      localStorage.setItem("micromatch_user", JSON.stringify(userData))
      return { success: true }
    } catch (error) {
      console.error("Signup error:", error)
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("micromatch_user")
    console.log("User logged out.")
  }

  const updateProfile = async (profileData) => {
    if (!user) {
      console.error("Cannot update profile: No user logged in.")
      return { success: false, error: "No user logged in." }
    }

    const updatedUser = {
      ...user,
      profile: { ...user.profile, ...profileData },
    }

    console.log("Updating profile for user ID:", user.id, "with data:", updatedUser)
    try {
      const response = await fetch(`${API_URL}/api/data/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: updatedUser,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to update profile: ${response.status} - ${errorText}`)
      }

      console.log("Profile updated successfully in backend.")
      setUser(updatedUser)
      localStorage.setItem("micromatch_user", JSON.stringify(updatedUser))
      return { success: true }
    } catch (error) {
      console.error("Profile update error:", error)
      return { success: false, error: error.message }
    }
  }

  const updateUser = async (fullUserData) => {
    if (!fullUserData || !fullUserData.id) {
      console.error("Cannot update user: Invalid user data provided.")
      return { success: false, error: "Invalid user data." }
    }

    console.log("Updating full user data for user ID:", fullUserData.id, "with data:", fullUserData)
    try {
      const response = await fetch(`${API_URL}/api/data/${fullUserData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: fullUserData,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to update user: ${response.status} - ${errorText}`)
      }

      console.log("Full user data updated successfully in backend.")
      setUser(fullUserData)
      localStorage.setItem("micromatch_user", JSON.stringify(fullUserData))
      return { success: true }
    } catch (error) {
      console.error("User update error:", error)
      return { success: false, error: error.message }
    }
  }

  const updatePartnershipStatus = async (partnershipId, newStatus) => {
    if (!user) {
      console.error("Cannot update partnership status: No user logged in.")
      return { success: false, error: "No user logged in." }
    }

    const updatedPartnerships = user.partnerships.map((p) => (p.id === partnershipId ? { ...p, status: newStatus } : p))

    const updatedUser = {
      ...user,
      partnerships: updatedPartnerships,
    }

    return await updateUser(updatedUser)
  }

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    updateUser,
    updatePartnershipStatus,
    loading,
    API_URL,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
