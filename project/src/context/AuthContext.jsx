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
    const loadUserFromStorage = async () => {
      const savedUser = localStorage.getItem('micromatch_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        // Re-fetch user data from backend to ensure it's the latest
        try {
          const response = await fetch(`${API_URL}/api/data/${parsedUser.id}`);
          if (response.ok) {
            const latestUserData = await response.json();
            setUser(latestUserData);
            console.log('User reloaded from backend:', latestUserData);
          } else {
            console.warn('Failed to fetch latest user data from backend, using local storage:', parsedUser);
            setUser(parsedUser);
          }
        } catch (error) {
          console.error('Error re-fetching user data on load:', error);
          setUser(parsedUser); // Fallback to local storage if API fails
        }
      }
      setLoading(false);
    };

    loadUserFromStorage();
  }, []); // Empty dependency array means this runs once on mount

  const login = async (email, password, userType) => {
    try {
      console.log('Attempting login for:', email, userType);
      
      const response = await fetch(`${API_URL}/api/data`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const allData = await response.json();
      
      const existingUser = Object.values(allData).find(
        (value) => value.email === email && value.userType === userType
      );

      if (existingUser) {
        console.log('User found:', existingUser);
        setUser(existingUser);
        localStorage.setItem('micromatch_user', JSON.stringify(existingUser));
        return { success: true };
      } else {
        console.log('User not found, attempting signup.');
        return await signup(email, password, userType);
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const signup = async (email, password, userType) => {
    try {
      console.log('Creating new user:', email, userType);
      
      const userData = {
        id: `${userType}_${Date.now()}`, // Unique ID for the user
        email,
        userType,
        profile: {
          firstName: '',
          lastName: '',
          bio: '',
          profilePicture: '',
          age: '',
          location: '',
          gender: '',
          plan: userType === 'business' ? 'Free' : undefined,
          targetAudience: userType === 'business' ? '' : undefined,
          productFocus: userType === 'business' ? '' : undefined,
          brandValues: userType === 'business' ? '' : undefined,
          pricing: userType === 'business' ? '' : undefined,
          platform: userType === 'influencer' ? '' : undefined,
          followerCount: userType === 'influencer' ? '' : undefined,
          niches: userType === 'influencer' ? '' : undefined,
          pricingRange: userType === 'influencer' ? '' : undefined,
        },
        partnerships: [],
        requests: []
      };

      console.log('Saving user data to API:', userData);
      const saveResponse = await fetch(`${API_URL}/api/data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userData.id,
          data: userData
        })
      });

      if (!saveResponse.ok) {
        const errorText = await saveResponse.text();
        throw new Error(`Failed to save user data: ${saveResponse.status} - ${errorText}`);
      }

      console.log('User saved successfully to backend.');
      setUser(userData);
      localStorage.setItem('micromatch_user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('micromatch_user');
    console.log('User logged out.');
  };

  const updateProfile = async (profileData) => {
    if (!user) {
      console.error('Cannot update profile: No user logged in.');
      return { success: false, error: 'No user logged in.' };
    }

    const updatedUser = {
      ...user,
      profile: { ...user.profile, ...profileData }
    };

    console.log('Updating profile for user ID:', user.id, 'with data:', updatedUser);
    try {
      const response = await fetch(`${API_URL}/api/data/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: updatedUser
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update profile: ${response.status} - ${errorText}`);
      }

      console.log('Profile updated successfully in backend.');
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
