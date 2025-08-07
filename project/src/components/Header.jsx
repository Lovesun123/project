import { Link } from 'react-router-dom';
import Button from './Button';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <div className="flex items-center gap-3">
        <div 
          className="w-12 h-12 rounded-full"
          style={{ backgroundColor: '#f9f2e0' }}
        />
        <Link to="/" className="text-2xl font-medium text-gray-dark">
          MicroMatch
        </Link>
      </div>
      
      <nav className="flex items-center gap-4">
        <Link to="/">
          <Button 
            variant="ghost" 
            className="rounded-full px-6 py-2 text-base hover:opacity-80"
            style={{ 
              backgroundColor: '#b9d7d9',
              color: '#7b3b3b'
            }}
          >
            Home
          </Button>
        </Link>
        <Link to="/pricing">
          <Button 
            variant="ghost" 
            className="rounded-full px-6 py-2 text-base hover:opacity-80"
            style={{ 
              backgroundColor: '#b9d7d9',
              color: '#7b3b3b'
            }}
          >
            Pricing
          </Button>
        </Link>
        <Link to="/signup">
          <Button 
            variant="ghost" 
            className="rounded-full px-6 py-2 text-base font-medium hover:opacity-80"
            style={{ 
              backgroundColor: '#b9d7d9',
              color: '#7b3b3b'
            }}
          >
            Sign Up
          </Button>
        </Link>
        <Link to="/login">
          <Button 
            variant="ghost" 
            className="rounded-full px-6 py-2 text-base hover:opacity-80"
            style={{ 
              backgroundColor: '#b9d7d9',
              color: '#7b3b3b'
            }}
          >
            Login
          </Button>
        </Link>
      </nav>
    </header>
  );
}