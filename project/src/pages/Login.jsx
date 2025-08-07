import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Label from '../components/Label';

export default function Login() {
  const [formData, setFormData] = useState({
    userType: 'business',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex items-center justify-center px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl w-full">
        {/* Left Side - Image */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <img
              src="/wback.png"
              alt="Woman working with cosmetic products in a professional setting"
              className="shadow-lg w-600 h-120"
            />
          </div>
        </div>

        {/* Right Side - Welcome and Form */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 
              className="text-4xl lg:text-5xl font-normal leading-tight text-center"
              style={{ color: '#7b3b3b' }}
            >
              Welcome back to<br />
              <span className="font-medium border-b-2 text-center" style={{ borderColor: '#7b3b3b' }}>
                MicroMatch!
              </span>
            </h2>
          </div>

          {/* Login Form */}
          <div 
            className="p-8 rounded-lg space-y-6"
            style={{ backgroundColor: '#f9f2e0' }}
          >
            <h3 
              className="text-2xl font-medium text-center border-b-2 pb-2 inline-block w-full"
              style={{ 
                color: '#7b3b3b',
                borderColor: '#7b3b3b'
              }}
            >
              LOGIN
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Toggle Buttons */}
              <div className="flex gap-4 justify-center">
                <Button
                  type="button"
                  onClick={() => setFormData({...formData, userType: 'business'})}
                  className={`rounded-full px-6 py-2 text-base transition-all ${
                    formData.userType === 'business' ? 'ring-2 ring-brown-dark' : ''
                  }`}
                  style={{
                    backgroundColor: '#b9d7d9',
                    color: '#7b3b3b'
                  }}
                >
                  Small Business
                </Button>
                <Button
                  type="button"
                  onClick={() => setFormData({...formData, userType: 'influencer'})}
                  className={`rounded-full px-6 py-2 text-base transition-all ${
                    formData.userType === 'influencer' ? 'ring-2 ring-brown-dark' : ''
                  }`}
                  style={{
                    backgroundColor: '#b9d7d9',
                    color: '#7b3b3b'
                  }}
                >
                  Micro-Influencer
                </Button>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label 
                    htmlFor="email" 
                    className="text-lg font-medium"
                    style={{ color: '#7b3b3b' }}
                  >
                    Email:
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 border-2 rounded-md"
                    style={{ 
                      borderColor: '#b9d7d9',
                      backgroundColor: '#ffffff'
                    }}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <Label 
                      htmlFor="password" 
                      className="text-lg font-medium"
                      style={{ color: '#7b3b3b' }}
                    >
                      Password:
                    </Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm hover:opacity-80"
                      style={{ color: '#919191' }}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="mt-2 border-2 rounded-md"
                    style={{ 
                      borderColor: '#b9d7d9',
                      backgroundColor: '#ffffff'
                    }}
                  />
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <span style={{ color: '#2a2829' }}>{"Don't have an account? "}</span>
                <Link 
                  to="/signup" 
                  className="underline hover:opacity-80"
                  style={{ color: '#919191' }}
                >
                  Sign up
                </Link>
              </div>

              {/* Go Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="rounded-full px-8 py-2 text-lg font-medium hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: '#b9d7d9',
                    color: '#7b3b3b'
                  }}
                >
                  Go
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
