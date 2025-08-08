import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { X } from 'lucide-react';

export default function Explore() {
  const { user, API_URL } = useAuth();
  const [influencers, setInfluencers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);

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

  useEffect(() => {
    fetchInfluencers();
  }, []);

  const fetchInfluencers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/data`);
      const data = await response.json();
      
      // Filter for influencer accounts only
      const influencerAccounts = Object.entries(data)
        .filter(([key, value]) => value.userType === 'influencer')
        .map(([key, value]) => ({ id: key, ...value }));
      
      setInfluencers(influencerAccounts);
    } catch (error) {
      console.error('Error fetching influencers:', error);
    }
  };

  const handleConnect = async (influencerId) => {
    try {
      // Add connection request to influencer's requests
      const influencer = influencers.find(inf => inf.id === influencerId);
      const updatedInfluencer = {
        ...influencer,
        requests: [...(influencer.requests || []), {
          id: Date.now(),
          businessId: user.id,
          businessName: `${user.profile.firstName} ${user.profile.lastName}`,
          businessEmail: user.email,
          businessProfile: user.profile,
          status: 'pending',
          createdAt: new Date().toISOString()
        }]
      };

      await fetch(`${API_URL}/api/data/${influencerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: updatedInfluencer })
      });

      // Show success notification
      setNotification({
        type: 'success',
        message: `You've connected with @${influencer.profile.firstName}!`,
        details: 'You will be notified by influencer'
      });

      // Hide notification after 5 seconds
      setTimeout(() => setNotification(null), 5000);

    } catch (error) {
      console.error('Error connecting:', error);
    }
  };

  const filteredInfluencers = influencers.filter(influencer => {
    if (!searchTerm) return true;
    
    const profile = influencer.profile || {};
    const searchLower = searchTerm.toLowerCase();
    
    return (
      (profile.firstName || '').toLowerCase().includes(searchLower) ||
      (profile.lastName || '').toLowerCase().includes(searchLower) ||
      (profile.niches || '').toLowerCase().includes(searchLower) ||
      (profile.location || '').toLowerCase().includes(searchLower)
    );
  });

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

          {/* Influencer Grid */}
          <div className="grid grid-cols-3 gap-8">
            {filteredInfluencers.map((influencer) => (
              <div 
                key={influencer.id}
                className="rounded-lg overflow-hidden"
                style={{ backgroundColor: '#b9d7d9' }}
              >
                {/* Profile Section */}
                <div className="p-6 text-center">
                  <div 
                    className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-lg font-semibold mb-4"
                    style={{ backgroundColor: '#f9f2e0', color: '#7b3b3b' }}
                  >
                    Profile
                  </div>
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={{ color: '#7b3b3b' }}
                  >
                    {influencer.profile?.firstName} {influencer.profile?.lastName}
                  </h3>
                  
                  <Button
                    onClick={() => handleConnect(influencer.id)}
                    className="px-6 py-2 rounded-full text-white font-medium mb-4"
                    style={{ backgroundColor: '#7b3b3b' }}
                  >
                    CONNECT
                  </Button>
                </div>

                {/* Info Section */}
                <div 
                  className="p-4 text-white"
                  style={{ backgroundColor: '#7b3b3b' }}
                >
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="font-semibold">Media:</span>
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

          {filteredInfluencers.length === 0 && (
            <div className="text-center py-12">
              <p 
                className="text-xl"
                style={{ color: '#7b3b3b' }}
              >
                No influencers found. Try a different search term.
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
                <div className="border-b-2 border-current mt-1 mb-2"></div>
                <div className="border-b-2 border-current mb-2"></div>
                <div className="border-b-2 border-current mb-4 w-3/4"></div>
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
