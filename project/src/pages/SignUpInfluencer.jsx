import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Label from '../components/Label';

export default function SignUpInfluencer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Micro-Influencer sign up:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen">
        {/* Left Side - Lighter Background */}
        <div 
          className="w-1/2 flex items-center justify-center px-8 py-12"
          style={{ backgroundColor: '#e1f3f4' }}
        >
          <div className="space-y-8 max-w-lg w-full">
            <div className="space-y-4">
              <h2 
                className="text-4xl lg:text-5xl font-normal leading-tight"
                style={{ color: '#7b3b3b' }}
              >
                Welcome to<br />
                <span className="font-medium border-b-2" style={{ borderColor: '#7b3b3b' }}>
                  MicroMatch!
                </span>
              </h2>
              <p 
                className="text-lg"
                style={{ color: '#7b3b3b' }}
              >
                Sign up as a small cosmetic business or<br />
                micro-influencer to get started.
              </p>
            </div>

            {/* Sign Up Form */}
            <div 
              className="p-8 rounded-lg space-y-6 border-2"
              style={{ 
                backgroundColor: '#f9f2e0',
                borderColor: '#c4b590'
              }}
            >
              <h3 
                className="text-2xl font-medium text-center border-b-2 pb-2 inline-block w-full"
                style={{ 
                  color: '#7b3b3b',
                  borderColor: '#7b3b3b'
                }}
              >
                SIGN UP
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Toggle Buttons */}
                <div className="flex gap-4 justify-center">
                  <Button
                    type="button"
                    onClick={() => navigate('/signup/business')}
                    className="rounded-full px-6 py-2 text-base hover:opacity-80 transition-all"
                    style={{
                      backgroundColor: '#b9d7d9',
                      color: '#7b3b3b'
                    }}
                  >
                    Small Business
                  </Button>
                  <Button
                    type="button"
                    className="rounded-full px-6 py-2 text-base ring-2 ring-brown-dark"
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
                    <Label 
                      htmlFor="password" 
                      className="text-lg font-medium"
                      style={{ color: '#7b3b3b' }}
                    >
                      Password:
                    </Label>
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

                {/* Sign In Link */}
                <div className="text-center">
                  <span style={{ color: '#2a2829' }}>Already have an account? </span>
                  <a 
                    href="/login" 
                    className="underline hover:opacity-80"
                    style={{ color: '#919191' }}
                  >
                    Sign in
                  </a>
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

        {/* Right Side - Darker Background with Image */}
        <div 
          className="w-1/2 flex items-center justify-center p-8"
          style={{ backgroundColor: '#b9d7d9' }}
        >
          <div 
            className="border p-6 w-full h-full flex items-center justify-center"
            style={{ borderColor: '#e0dac9', borderWidth: '2px' }}
          >
            <img
              src="/Mi.png"
              alt="Woman applying skincare products"
              className="w-full h-full object-cover"
              style={{ maxHeight: '600px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
