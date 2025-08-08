import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { X, User, Star } from 'lucide-react'; // Import Star icon

export default function Explore() {
  const { user, API_URL, updateProfile } = useAuth(); // Added updateProfile
  const [influencers, setInfluencers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [loadingInfluencers, setLoadingInfluencers] = useState(true);

  // Redirect if not a business user
  if (!user || user.userType !== 'business') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#e1f3f4' }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#7b3b3b' }}>
            Access Restricted
          </h2>
          <p style={{ color: '#7b3b3b' }}>
            Only Small Business accounts can access the search feature.
          </p>
        </div>
      </div>
    );
  }

  const fetchInfluencers = useCallback(async () => {
    setLoadingInfluencers(true);
    try {
      const response = await fetch(`${API_URL}/api/data`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const allData = await response.json();
      
      console.log('All data fetched for Explore:', allData);
      
      const influencerAccounts = Object.values(allData)
        .filter(value => value.userType === 'influencer' && value.profile)
        .map(value => ({ 
          id: value.id,
          ...value,
          profile: value.profile || {}
        }));
      
      console.log('Filtered influencers for display:', influencerAccounts);
      setInfluencers(influencerAccounts);
    } catch (error) {
      console.error('Error fetching influencers:', error);
      setInfluencers([]);
    } finally {
      setLoadingInfluencers(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchInfluencers();
  }, [fetchInfluencers]); // Depend on fetchInfluencers

  const handleConnect = async (influencerId) => {
    try {
      const influencer = influencers.find(inf => inf.id === influencerId);
      if (!influencer) {
        console.error('Influencer not found for connection:', influencerId);
        return;
      }

      // 1. Update influencer's requests
      const updatedInfluencer = {
        ...influencer,
        requests: [...(influencer.requests || []), {
          id: Date.now(), // Unique ID for this request
          businessId: user.id,
          businessName: `${user.profile.firstName} ${user.profile.lastName}`,
          businessEmail: user.email,
          businessProfile: user.profile,
          status: 'pending',
          createdAt: new Date().toISOString()
        }]
      };

      const influencerUpdateResponse = await fetch(`${API_URL}/api/data/${influencerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: updatedInfluencer })
      });

      if (!influencerUpdateResponse.ok) {
        const errorText = await influencerUpdateResponse.text();
        throw new Error(`Failed to send connection request to influencer: ${influencerUpdateResponse.status} - ${errorText}`);
      }

      // 2. Update business user's partnerships (as pending)
      const newPartnership = {
        id: Date.now() + 1, // Unique ID for this partnership entry
        influencerId: influencer.id,
        influencerName: `${influencer.profile.firstName} ${influencer.profile.lastName}`,
        influencerEmail: influencer.email,
        influencerProfile: influencer.profile,
        status: 'pending', // Status from business perspective
        requestedAt: new Date().toISOString()
      };

      const updatedBusinessUser = {
        ...user,
        partnerships: [...(user.partnerships || []), newPartnership]
      };

      const businessUpdateResponse = await fetch(`${API_URL}/api/data/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: updatedBusinessUser })
      });

      if (!businessUpdateResponse.ok) {
        const errorText = await businessUpdateResponse.text();
        throw new Error(`Failed to update business user's partnerships: ${businessUpdateResponse.status} - ${errorText}`);
      }

      // Update local user state in AuthContext
      updateProfile(updatedBusinessUser.profile); // This will also update partnerships in local storage

      setNotification({
        type: 'success',
        message: `You've connected with @${influencer.profile.firstName || 'Micro-Influencer'}!`,
        details: 'View connection status in your profile.'
      });

      // Re-fetch influencers to update their status on the page
      fetchInfluencers(); 
      setTimeout(() => setNotification(null), 5000);

    } catch (error) {
      console.error('Error connecting:', error);
      setNotification({
        type: 'error',
        message: 'Failed to send connection request.',
        details: error.message
      });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const filteredInfluencers = influencers.filter(influencer => {
    // If no search term, show all influencers that have a profile
    if (!searchTerm.trim()) {
      return influencer.profile && Object.keys(influencer.profile).length > 0;
    }
    
    const profile = influencer.profile || {};
    const searchLower = searchTerm.toLowerCase();
    
    return (
      (profile.firstName || '').toLowerCase().includes(searchLower) ||
      (profile.lastName || '').toLowerCase().includes(searchLower) ||
      (profile.niches || '').toLowerCase().includes(searchLower) ||
      (profile.location || '').toLowerCase().includes(searchLower) ||
      (profile.platform || '').toLowerCase().includes(searchLower)
    );
  });

  // Function to check if a business has already sent a request to an influencer
  const hasSentRequest = (influencerId) => {
    return user?.partnerships?.some(p => p.influencerId === influencerId && p.status === 'pending');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e1f3f4' }}>
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-8 z-50">
          <div 
            className="p-4 rounded-lg shadow-lg border-2 max-w-sm"
            style={{ 
              backgroundColor: notification.type === 'success' ? '#d4edda' : '#f8d7da',
              borderColor: notification.type === 'success' ? '#28a745' : '#dc3545',
              color: notification.type === 'success' ? '#155724' : '#721c24'
            }}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
                🔔
              </div>
              <div className="flex-1">
                <p className="font-semibold">
                  {notification.message}
                </p>
                <p className="text-sm mt-1">
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ color: '#7b3b3b' }}
            >
              Discover Creators Built for Your Brand
            </h1>
            <p 
              className="text-xl mb-8"
              style={{ color: '#7b3b3b' }}
            >
              Just search, select, and start growing.
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto">
              <Input
                type="text"
                placeholder="Search (type in specific niche)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 text-lg rounded-lg"
                style={{ 
                  backgroundColor: '#ffffff',
                  borderColor: '#b9d7d9'
                }}
              />
            </div>
          </div>

          {/* Loading State */}
          {loadingInfluencers && (
            <div className="text-center py-12">
              <p className="text-xl" style={{ color: '#7b3b3b' }}>Loading influencers...</p>
            </div>
          )}

          {/* Influencer Grid */}
          {!loadingInfluencers && (
            <div className="grid grid-cols-3 gap-8">
              {filteredInfluencers.map((influencer) => (
                <div 
                  key={influencer.id}
                  className="rounded-lg overflow-hidden"
                  style={{ backgroundColor: '#b9d7d9' }}
                >
                  {/* Profile Section */}
                  <div className="p-6 text-center">
                    {/* Profile Picture */}
                    {influencer.profile?.profilePicture ? (
                      <img
                        src={influencer.profile.profilePicture || "/placeholder.svg"}
                        alt={`${influencer.profile?.firstName} ${influencer.profile?.lastName}`}
                        className="w-20 h-20 mx-auto rounded-full object-cover mb-4 border-2"
                        style={{ borderColor: '#f9f2e0' }}
                      />
                    ) : (
                      <div 
                        className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-lg font-semibold mb-4 border-2"
                        style={{ backgroundColor: '#f9f2e0', color: '#7b3b3b', borderColor: '#c4b590' }}
                      >
                        <User size={32} />
                      </div>
                    )}
                    
                    <h3 
                      className="text-lg font-semibold mb-2"
                      style={{ color: '#7b3b3b' }}
                    >
                      {influencer.profile?.firstName && influencer.profile?.lastName 
                        ? `${influencer.profile.firstName} ${influencer.profile.lastName}`
                        : 'Micro-Influencer'
                      }
                    </h3>
                    
                    <Button
                      onClick={() => handleConnect(influencer.id)}
                      className="px-6 py-2 rounded-full text-white font-medium mb-4"
                      style={{ backgroundColor: hasSentRequest(influencer.id) ? '#7b3b3b' : '#2a2829' }}
                      disabled={hasSentRequest(influencer.id)}
                    >
                      {hasSentRequest(influencer.id) ? 'PENDING' : 'CONNECT'}
                    </Button>
                  </div>

                  {/* Info Section */}
                  <div 
                    className="p-4 text-white"
                    style={{ backgroundColor: '#7b3b3b' }}
                  >
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="font-semibold">Media:</span> {influencer.profile?.platform || 'N/A'}
                      </div>
                      <div>
                        <span className="font-semibold">Followers:</span> {influencer.profile?.followerCount || 'N/A'}
                      </div>
                      <div>
                        <span className="font-semibold">Demo:</span>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedInfluencer(influencer);
                          setShowModal(true);
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

          {!loadingInfluencers && filteredInfluencers.length === 0 && searchTerm.trim() && (
            <div className="text-center py-12">
              <p 
                className="text-xl"
                style={{ color: '#7b3b3b' }}
              >
                No influencers found matching "{searchTerm}". Try a different search term.
              </p>
            </div>
          )}

          {!loadingInfluencers && filteredInfluencers.length === 0 && !searchTerm.trim() && influencers.length === 0 && (
            <div className="text-center py-12">
              <p 
                className="text-xl"
                style={{ color: '#7b3b3b' }}
              >
                No micro-influencers have created profiles yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedInfluencer && (
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
              Other Information:
            </h3>
            
            <div className="space-y-4" style={{ color: '#7b3b3b' }}>
              <div>
                <strong>BIO</strong>
                {selectedInfluencer.profile?.bio ? (
                  <p className="mt-2 p-2 bg-white rounded border">
                    {selectedInfluencer.profile.bio}
                  </p>
                ) : (
                  <div>
                    <div className="border-b-2 border-current mt-1 mb-2"></div>
                    <div className="border-b-2 border-current mb-2"></div>
                    <div className="border-b-2 border-current mb-4 w-3/4"></div>
                  </div>
                )}
              </div>
              
              <div>
                <strong>Age (optional):</strong> {selectedInfluencer.profile?.age || 'Not specified'}
              </div>
              
              <div>
                <strong>Location (optional):</strong> {selectedInfluencer.profile?.location || 'Not specified'}
              </div>
              
              <div>
                <strong>Gender (optional):</strong> {selectedInfluencer.profile?.gender || 'Not specified'}
              </div>
              
              <div>
                <strong>Target audience:</strong> {selectedInfluencer.profile?.targetAudience || 'Not specified'}
              </div>
              
              <div>
                <strong>Niche(s):</strong> {selectedInfluencer.profile?.niches || 'Not specified'}
              </div>
              
              <div>
                <strong>Pricing range:</strong> {selectedInfluencer.profile?.pricingRange || 'Not specified'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
