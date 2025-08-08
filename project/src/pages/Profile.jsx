import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Label from '../components/Label';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user?.profile || {});
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await updateProfile(formData);
    if (result.success) {
      setIsEditing(false);
    }
    
    setLoading(false);
  };

  const isInfluencer = user.userType === 'influencer';
  const isBusiness = user.userType === 'business';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e1f3f4' }}>
      <div className="flex min-h-screen">
        {/* Left Side - Profile Form */}
        <div className="w-1/2 flex items-center justify-center px-8 py-12">
          <div className="space-y-8 max-w-lg w-full">
            {/* Profile Header */}
            <div className="text-center space-y-4">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-2 rounded-full text-white font-medium"
                style={{ backgroundColor: '#7b3b3b' }}
              >
                {isEditing ? 'Cancel' : 'Finalize Profile'}
              </Button>
              
              <div 
                className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-4xl font-bold"
                style={{ backgroundColor: '#f9f2e0', color: '#7b3b3b' }}
              >
                Profile
              </div>
              
              <div>
                <h2 
                  className="text-2xl font-semibold"
                  style={{ color: '#7b3b3b' }}
                >
                  {isInfluencer ? 'Micro-Influencer' : 'Small Business'} Name
                </h2>
                <button 
                  className="text-sm underline"
                  style={{ color: '#7b3b3b' }}
                >
                  Update Name
                </button>
              </div>
            </div>

            {/* Profile Form */}
            <div 
              className="p-8 rounded-lg space-y-4 border-2"
              style={{ 
                backgroundColor: '#f9f2e0',
                borderColor: '#c4b590'
              }}
            >
              {isEditing && (
                <div className="text-right">
                  <span 
                    className="text-sm"
                    style={{ color: '#7b3b3b' }}
                  >
                    Editing mode
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Common Fields */}
                <div>
                  <Label style={{ color: '#7b3b3b' }}>First Name</Label>
                  <Input
                    name="firstName"
                    value={formData.firstName || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Name"
                    style={{ 
                      borderColor: '#b9d7d9',
                      backgroundColor: isEditing ? '#ffffff' : '#f5f5f5'
                    }}
                  />
                </div>

                <div>
                  <Label style={{ color: '#7b3b3b' }}>Last Name</Label>
                  <Input
                    name="lastName"
                    value={formData.lastName || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Name"
                    style={{ 
                      borderColor: '#b9d7d9',
                      backgroundColor: isEditing ? '#ffffff' : '#f5f5f5'
                    }}
                  />
                </div>

                <div>
                  <Label style={{ color: '#7b3b3b' }}>Email</Label>
                  <Input
                    name="email"
                    value={user.email}
                    disabled
                    style={{ 
                      borderColor: '#b9d7d9',
                      backgroundColor: '#f5f5f5'
                    }}
                  />
                </div>

                {/* Business-specific fields */}
                {isBusiness && (
                  <>
                    <div>
                      <Label style={{ color: '#7b3b3b' }}>Plan</Label>
                      <Input
                        name="plan"
                        value={formData.plan || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="plan"
                        style={{ 
                          borderColor: '#b9d7d9',
                          backgroundColor: isEditing ? '#ffffff' : '#f5f5f5'
                        }}
                      />
                    </div>

                    <div>
                      <Label style={{ color: '#7b3b3b' }}>Target Audience</Label>
                      <Input
                        name="targetAudience"
                        value={formData.targetAudience || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="audience"
                        style={{ 
                          borderColor: '#b9d7d9',
                          backgroundColor: isEditing ? '#ffffff' : '#f5f5f5'
                        }}
                      />
                    </div>

                    <div>
                      <Label style={{ color: '#7b3b3b' }}>Product Focus</Label>
                      <Input
                        name="productFocus"
                        value={formData.productFocus || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="focus"
                        style={{ 
                          borderColor: '#b9d7d9',
                          backgroundColor: isEditing ? '#ffffff' : '#f5f5f5'
                        }}
                      />
                    </div>

                    <div>
                      <Label style={{ color: '#7b3b3b' }}>Brand values</Label>
                      <Input
                        name="brandValues"
                        value={formData.brandValues || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="value1, value2, etc."
                        style={{ 
                          borderColor: '#b9d7d9',
                          backgroundColor: isEditing ? '#ffffff' : '#f5f5f5'
                        }}
                      />
                    </div>

                    <div>
                      <Label style={{ color: '#7b3b3b' }}>Pricing</Label>
                      <Input
                        name="pricing"
                        value={formData.pricing || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="pricing"
                        style={{ 
                          borderColor: '#b9d7d9',
                          backgroundColor: isEditing ? '#ffffff' : '#f5f5f5'
                        }}
                      />
                    </div>
                  </>
                )}

                {/* Influencer-specific fields */}
                {isInfluencer && (
                  <>
                    <div>
                      <Label style={{ color: '#7b3b3b' }}>Platform</Label>
                      <Input
                        name="platform"
                        value={formData.platform || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="platform"
                        style={{ 
                          borderColor: '#b9d7d9',
                          backgroundColor: isEditing ? '#ffffff' : '#f5f5f5'
                        }}
                      />
                    </div>

                    <div>
                      <Label style={{ color: '#7b3b3b' }}>Follower Count <span className="text-sm">(round to nearest thousand)</span></Label>
                      <Input
                        name="followerCount"
                        value={formData.followerCount || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="count"
                        style={{ 
                          borderColor: '#b9d7d9',
                          backgroundColor: isEditing ? '#ffffff' : '#f5f5f5'
                        }}
                      />
                    </div>

                    <div>
                      <Label style={{ color: '#7b3b3b' }}>Niche(s)</Label>
                      <Input
                        name="niches"
                        value={formData.niches || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="niche1, niche2, etc."
                        style={{ 
                          borderColor: '#b9d7d9',
                          backgroundColor: isEditing ? '#ffffff' : '#f5f5f5'
                        }}
                      />
                    </div>

                    <div>
                      <Label style={{ color: '#7b3b3b' }}>Pricing</Label>
                      <Input
                        name="pricingRange"
                        value={formData.pricingRange || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="pricing"
                        style={{ 
                          borderColor: '#b9d7d9',
                          backgroundColor: isEditing ? '#ffffff' : '#f5f5f5'
                        }}
                      />
                    </div>
                  </>
                )}

                {/* Common fields continued */}
                <div>
                  <Label style={{ color: '#7b3b3b' }}>Age</Label>
                  <Input
                    name="age"
                    value={formData.age || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="age"
                    style={{ 
                      borderColor: '#b9d7d9',
                      backgroundColor: isEditing ? '#ffffff' : '#f5f5f5'
                    }}
                  />
                </div>

                <div>
                  <Label style={{ color: '#7b3b3b' }}>Location</Label>
                  <Input
                    name="location"
                    value={formData.location || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="location"
                    style={{ 
                      borderColor: '#b9d7d9',
                      backgroundColor: isEditing ? '#ffffff' : '#f5f5f5'
                    }}
                  />
                </div>

                <div>
                  <Label style={{ color: '#7b3b3b' }}>Gender</Label>
                  <Input
                    name="gender"
                    value={formData.gender || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="gender"
                    style={{ 
                      borderColor: '#b9d7d9',
                      backgroundColor: isEditing ? '#ffffff' : '#f5f5f5'
                    }}
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-center pt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-2 rounded-full text-white font-medium"
                      style={{ backgroundColor: '#7b3b3b' }}
                    >
                      {loading ? 'Saving...' : 'Save Profile'}
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - Bio and Partnerships */}
        <div className="w-1/2 flex flex-col items-center justify-center px-8 py-12">
          {/* Bio Section */}
          <div className="w-full max-w-lg mb-8">
            <div className="space-y-4">
              <h3 
                className="text-2xl font-semibold border-b-2 pb-2"
                style={{ 
                  color: '#7b3b3b',
                  borderColor: '#7b3b3b'
                }}
              >
                Bio
              </h3>
              <div className="space-y-2">
                <div 
                  className="h-1 w-full"
                  style={{ backgroundColor: '#7b3b3b' }}
                ></div>
                <div 
                  className="h-1 w-full"
                  style={{ backgroundColor: '#7b3b3b' }}
                ></div>
                <div 
                  className="h-1 w-3/4"
                  style={{ backgroundColor: '#7b3b3b' }}
                ></div>
              </div>
              <button 
                className="text-sm underline"
                style={{ color: '#7b3b3b' }}
              >
                Update Bio
              </button>
            </div>
          </div>

          {/* Partnerships Section */}
          <div 
            className="w-full max-w-lg p-6 rounded-lg border-2"
            style={{ 
              backgroundColor: '#f9f2e0',
              borderColor: '#c4b590'
            }}
          >
            <h3 
              className="text-2xl font-semibold text-center mb-6"
              style={{ color: '#7b3b3b' }}
            >
              Partnerships
            </h3>
            
            <div className="space-y-4">
              {/* Sample partnerships */}
              {[1, 2, 3, 4].map((item, index) => (
                <div key={item} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm"
                      style={{ backgroundColor: '#b9d7d9', color: '#7b3b3b' }}
                    >
                      Profile
                    </div>
                    <span style={{ color: '#7b3b3b' }}>Name</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {index === 0 && (
                      <div className="w-6 h-6 flex items-center justify-center">
                        <div className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
                      </div>
                    )}
                    <select 
                      className="px-3 py-1 rounded text-sm border"
                      style={{ 
                        backgroundColor: '#ffffff',
                        borderColor: '#b9d7d9',
                        color: '#7b3b3b'
                      }}
                      defaultValue={index === 0 ? 'Connected' : index === 2 ? 'Declined' : index === 3 ? 'Ongoing' : 'Past'}
                    >
                      <option value="Connected">Connected</option>
                      <option value="Past">Past</option>
                      <option value="Declined">Declined</option>
                      <option value="Ongoing">Ongoing</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
