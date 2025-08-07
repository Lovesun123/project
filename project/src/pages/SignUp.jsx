import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl w-full">
        {/* Left Side - Welcome and Button Selection */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 
              className="text-4xl lg:text-5xl font-normal leading-tight text-center"
              style={{ color: '#7b3b3b' }}
            >
              Welcome to<br />
              <span className="font-medium border-b-2 text-center" style={{ borderColor: '#7b3b3b' }}>
                MicroMatch!
              </span>
            </h2>
            <p 
              className="text-lg text-center"
              style={{ color: '#7b3b3b' }}
            >
              Sign up as a small cosmetic business or<br />
              micro-influencer to get started.
            </p>
          </div>

          {/* Sign Up Selection */}
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
              SIGN UP
            </h3>

            {/* Selection Buttons */}
            <div className="flex flex-col gap-6 items-center">
              <Button
                type="button"
                onClick={() => navigate('/signup/business')}
                className="rounded-full px-8 py-4 text-lg font-medium hover:opacity-80 transition-all w-full max-w-xs"
                style={{
                  backgroundColor: '#b9d7d9',
                  color: '#7b3b3b'
                }}
              >
                Small Business
              </Button>
              
              <Button
                type="button"
                onClick={() => navigate('/signup/influencer')}
                className="rounded-full px-8 py-4 text-lg font-medium hover:opacity-80 transition-all w-full max-w-xs"
                style={{
                  backgroundColor: '#b9d7d9',
                  color: '#7b3b3b'
                }}
              >
                Micro-Influencer
              </Button>
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
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <img
              src="/meakup.png"
              alt="Cosmetic products and makeup items arranged on a pink surface"
              className=" shadow-lg w-600 h-130"
            />
          </div>
        </div>
      </div>
    </div>
  );
}