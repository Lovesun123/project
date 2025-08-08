import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Clock, BarChart3, MessageCircle, Star } from 'lucide-react';
import Footer from '../components/Footer'; // Import the new Footer component

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div 
        className="flex flex-1" // Use flex-1 to make it take available space
        style={{ backgroundColor: '#b9d7d9' }} 
      >
        {/* Left Side - Hero Content */}
        <div 
          className="w-full flex items-center justify-center px-12 py-16" // Make it full width as there's no right side
        >
          <div className="space-y-8 max-w-lg text-center"> {/* Center content */}
            <div className="space-y-6">
              <h1 
                className="text-5xl lg:text-6xl font-bold leading-tight"
                style={{ color: '#7b3b3b' }}
              >
                Stop<br />
                Guessing.<br />
                Start<br />
                Growing.
              </h1>
              <p 
                className="text-lg leading-relaxed"
                style={{ color: '#7b3b3b' }}
              >
                Discover the right creators to grow your cosmetic brand—faster, smarter, and stress-free.
              </p>
            </div>

            <Button
              onClick={() => navigate('/signup')}
              className="px-8 py-3 text-lg font-medium rounded-full hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: '#2a2829',
                color: '#ffffff'
              }}
            >
              SIGN UP
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div 
        className="py-16 px-12"
        style={{ backgroundColor: '#e1f3f4' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center space-y-4">
              <div 
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#b9d7d9' }}
              >
                <Clock size={32} style={{ color: '#7b3b3b' }} />
              </div>
              <h3 
                className="text-xl font-semibold"
                style={{ color: '#7b3b3b' }}
              >
                Save Hours of Searching
              </h3>
              <p 
                className="text-base leading-relaxed"
                style={{ color: '#7b3b3b' }}
              >
                Instantly find influencers that fit—no more endless scrolling.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center space-y-4">
              <div 
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#b9d7d9' }}
              >
                <BarChart3 size={32} style={{ color: '#7b3b3b' }} />
              </div>
              <h3 
                className="text-xl font-semibold"
                style={{ color: '#7b3b3b' }}
              >
                Real Data, Real Results
              </h3>
              <p 
                className="text-base leading-relaxed"
                style={{ color: '#7b3b3b' }}
              >
                Transparent insights on followers, engagement, and more directly from the influencers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center space-y-4">
              <div 
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#b9d7d9' }}
              >
                <MessageCircle size={32} style={{ color: '#7b3b3b' }} />
              </div>
              <h3 
                className="text-xl font-semibold"
                style={{ color: '#7b3b3b' }}
              >
                Connect in a Click
              </h3>
              <p 
                className="text-base leading-relaxed"
                style={{ color: '#7b3b3b' }}
              >
                Reach out to creators directly to avoid confusion from various platforms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div 
        className="py-16 px-12"
        style={{ backgroundColor: '#e1f3f4' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div 
                className="h-1 flex-1 max-w-32"
                style={{ backgroundColor: '#7b3b3b' }}
              ></div>
              <h2 
                className="text-3xl font-bold mx-8"
                style={{ color: '#7b3b3b' }}
              >
                5 Star Reviews
              </h2>
              <div 
                className="h-1 flex-1 max-w-32"
                style={{ backgroundColor: '#7b3b3b' }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Review 1 */}
            <div 
              className="p-6 rounded-lg space-y-4"
              style={{ backgroundColor: '#b9d7d9' }}
            >
              <div className="space-y-2">
                <p 
                  className="font-semibold"
                  style={{ color: '#7b3b3b' }}
                >
                  Michelle, Owner of
                </p>
                <p 
                  className="italic"
                  style={{ color: '#7b3b3b' }}
                >
                  Glow & Root Skincare
                </p>
              </div>
              <p 
                className="text-base leading-relaxed"
                style={{ color: '#7b3b3b' }}
              >
                "Found a perfect match in minutes. Way easier than DMs, and it actually drove sales!"
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#FFA500" color="#FFA500" />
                ))}
              </div>
            </div>

            {/* Review 2 */}
            <div 
              className="p-6 rounded-lg space-y-4"
              style={{ backgroundColor: '#b9d7d9' }}
            >
              <div className="space-y-2">
                <p 
                  className="font-semibold"
                  style={{ color: '#7b3b3b' }}
                >
                  Jasmine, Owner of
                </p>
                <p 
                  className="italic"
                  style={{ color: '#7b3b3b' }}
                >
                  Berry Blush
                </p>
              </div>
              <p 
                className="text-base leading-relaxed"
                style={{ color: '#7b3b3b' }}
              >
                "This site connected me with three micro-influencers nearby who genuinely love my niche. The campaign brought great local engagement and new customers."
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#FFA500" color="#FFA500" />
                ))}
              </div>
            </div>

            {/* Review 3 */}
            <div 
              className="p-6 rounded-lg space-y-4"
              style={{ backgroundColor: '#b9d7d9' }}
            >
              <div className="space-y-2">
                <p 
                  className="font-semibold"
                  style={{ color: '#7b3b3b' }}
                >
                  Emily, Owner of
                </p>
                <p 
                  className="italic"
                  style={{ color: '#7b3b3b' }}
                >
                  Emily's Eyeshadow
                </p>
              </div>
              <p 
                className="text-base leading-relaxed"
                style={{ color: '#7b3b3b' }}
              >
                "The platform helped me choose influencers whose followers matched my niche. It made outreach easy and effective."
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#FFA500" color="#FFA500" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div 
        className="py-16 px-12"
        style={{ backgroundColor: '#e1f3f4' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div 
                className="h-1 flex-1 max-w-32"
                style={{ backgroundColor: '#7b3b3b' }}
              ></div>
              <h2 
                className="text-3xl font-bold mx-8"
                style={{ color: '#7b3b3b' }}
              >
                Plans
              </h2>
              <div 
                className="h-1 flex-1 max-w-32"
                style={{ backgroundColor: '#7b3b3b' }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Free Plan */}
            <div 
              className="p-8 rounded-lg text-center space-y-6"
              style={{ backgroundColor: '#b9d7d9' }}
            >
              <div>
                <h3 
                  className="text-2xl font-bold border-b-2 pb-2 inline-block"
                  style={{ 
                    color: '#7b3b3b',
                    borderColor: '#7b3b3b'
                  }}
                >
                  Free
                </h3>
              </div>
              <div>
                <span 
                  className="text-4xl font-bold"
                  style={{ color: '#7b3b3b' }}
                >
                  $0
                </span>
                <div 
                  className="h-1 mt-2"
                  style={{ backgroundColor: '#7b3b3b' }}
                ></div>
              </div>
              <p 
                className="text-base"
                style={{ color: '#7b3b3b' }}
              >
                Bulleted list of features they now have access to
              </p>
            </div>

            {/* Standard Plan */}
            <div 
              className="p-8 rounded-lg text-center space-y-6"
              style={{ backgroundColor: '#b9d7d9' }}
            >
              <div>
                <h3 
                  className="text-2xl font-bold border-b-2 pb-2 inline-block"
                  style={{ 
                    color: '#7b3b3b',
                    borderColor: '#7b3b3b'
                  }}
                >
                  Standard
                </h3>
              </div>
              <div>
                <span 
                  className="text-4xl font-bold"
                  style={{ color: '#7b3b3b' }}
                >
                  $50
                </span>
                <div 
                  className="h-1 mt-2"
                  style={{ backgroundColor: '#7b3b3b' }}
                ></div>
              </div>
              <p 
                className="text-base"
                style={{ color: '#7b3b3b' }}
              >
                Bulleted list of features they now have access to
              </p>
            </div>

            {/* Premium Plan */}
            <div 
              className="p-8 rounded-lg text-center space-y-6"
              style={{ backgroundColor: '#b9d7d9' }}
            >
              <div>
                <h3 
                  className="text-2xl font-bold border-b-2 pb-2 inline-block"
                  style={{ 
                    color: '#7b3b3b',
                    borderColor: '#7b3b3b'
                  }}
                >
                  Premium
                </h3>
              </div>
              <div>
                <span 
                  className="text-4xl font-bold"
                  style={{ color: '#7b3b3b' }}
                >
                  $100
                </span>
                <div 
                  className="h-1 mt-2"
                  style={{ backgroundColor: '#7b3b3b' }}
                ></div>
              </div>
              <p 
                className="text-base"
                style={{ color: '#7b3b3b' }}
              >
                Bulleted list of features they now have access to
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
}
