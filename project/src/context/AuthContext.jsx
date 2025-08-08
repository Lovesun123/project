import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use RAILWAY_API_URL environment variable for Railway deployment
  const API_URL = import.meta.env.VITE_RAILWAY_API_URL || 'http://localhost:3001';

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('micromatch_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, userType) => {
    try {
      // For demo purposes, we'll create a mock login
      // In production, this would validate against your API
      const userData = {
        id: `${userType}_${Date.now()}`,
        email,
        userType, // 'business' or 'influencer'
        profile: {
          firstName: '',
          lastName: '',
          bio: '',
          age: '',
          location: '',
          gender: '',
          // Business-specific fields
          plan: userType === 'business' ? 'Free' : undefined,
          targetAudience: userType === 'business' ? '' : undefined,
          productFocus: userType === 'business' ? '' : undefined,
          brandValues: userType === 'business' ? '' : undefined,
          pricing: userType === 'business' ? '' : undefined,
          // Influencer-specific fields
          platform: userType === 'influencer' ? '' : undefined,
          followerCount: userType === 'influencer' ? '' : undefined,
          niches: userType === 'influencer' ? '' : undefined,
          pricingRange: userType === 'influencer' ? '' : undefined,
        },
        partnerships: [],
        requests: []
      };

      // Save user profile to API
      await fetch(`${API_URL}/api/data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userData.id,
          data: userData
        })
      });

      setUser(userData);
      localStorage.setItem('micromatch_user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const signup = async (email, password, userType) => {
    return await login(email, password, userType);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('micromatch_user');
  };

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = {
        ...user,
        profile: { ...user.profile, ...profileData }
      };

      // Update user profile in API
      await fetch(`${API_URL}/api/data/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: updatedUser
        })
      });

      setUser(updatedUser);
      localStorage.setItem('micromatch_user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    loading,
    API_URL
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
