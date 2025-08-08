import { Link, useNavigate } from 'react-router-dom';
import { User, Search } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header 
      className="flex items-center justify-between px-8 py-6"
      style={{ backgroundColor: '#2a2829' }}
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-12 h-12 rounded-full"
          style={{ backgroundColor: '#f9f2e0' }}
        />
        <Link to="/" className="text-2xl font-medium" style={{ color: '#ffffff' }}>
          MicroMatch
        </Link>
      </div>
      
      <nav className="flex items-center gap-4">
        <Link to="/">
          <Button 
            variant="ghost" 
            className="rounded-full px-8 py-3 text-base hover:opacity-80"
            style={{ 
              backgroundColor: '#b9d7d9',
              color: '#7b3b3b',
              borderRadius: '9999px'
            }}
          >
            Home
          </Button>
        </Link>

        {/* Show Search button only for logged-in Small Businesses */}
        {user && user.userType === 'business' && (
          <Link to="/explore">
            <Button 
              variant="ghost" 
              className="rounded-full px-8 py-3 text-base hover:opacity-80"
              style={{ 
                backgroundColor: '#b9d7d9',
                color: '#7b3b3b',
                borderRadius: '9999px'
              }}
            >
              <Search size={16} className="mr-2" />
              Explore
            </Button>
          </Link>
        )}

        {/* Show Requests button only for logged-in Micro-Influencers */}
        {user && user.userType === 'influencer' && (
          <Link to="/requests">
            <Button 
              variant="ghost" 
              className="rounded-full px-8 py-3 text-base hover:opacity-80"
              style={{ 
                backgroundColor: '#b9d7d9',
                color: '#7b3b3b',
                borderRadius: '9999px'
              }}
            >
              Requests
            </Button>
          </Link>
        )}

        <Link to="/pricing">
          <Button 
            variant="ghost" 
            className="rounded-full px-8 py-3 text-base hover:opacity-80"
            style={{ 
              backgroundColor: '#b9d7d9',
              color: '#7b3b3b',
              borderRadius: '9999px'
            }}
          >
            Pricing
          </Button>
        </Link>

        {!user ? (
          <>
            <Link to="/signup">
              <Button 
                variant="ghost" 
                className="rounded-full px-8 py-3 text-base font-medium hover:opacity-80"
                style={{ 
                  backgroundColor: '#b9d7d9',
                  color: '#7b3b3b',
                  borderRadius: '9999px'
                }}
              >
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="ghost" 
                className="rounded-full px-8 py-3 text-base hover:opacity-80"
                style={{ 
                  backgroundColor: '#b9d7d9',
                  color: '#7b3b3b',
                  borderRadius: '9999px'
                }}
              >
                Login
              </Button>
            </Link>
          </>
        ) : (
          <>
            {/* Show Profile button for all logged-in users */}
            <Link to="/profile">
              <Button 
                variant="ghost" 
                className="rounded-full w-12 h-12 p-0 hover:opacity-80 hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg border-2"
                style={{ 
                  backgroundColor: '#f9f2e0',
                  color: '#7b3b3b',
                  borderColor: '#b9d7d9'
                }}
              >
                <User size={20} />
              </Button>
            </Link>
            <Button 
              onClick={handleLogout}
              variant="ghost" 
              className="rounded-full px-8 py-3 text-base hover:opacity-80"
              style={{ 
                backgroundColor: '#b9d7d9',
                color: '#7b3b3b',
                borderRadius: '9999px'
              }}
            >
              Logout
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
