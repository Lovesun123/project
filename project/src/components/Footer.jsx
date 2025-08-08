import React from 'react';

export default function Footer() {
  return (
    <footer 
      className="w-full py-8 px-12 text-center"
      style={{ backgroundColor: '#2a2829', color: '#ffffff' }}
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-lg font-medium mb-4">MicroMatch</p>
        <div className="flex justify-center gap-8 mb-4">
          <a href="#" className="hover:underline" style={{ color: '#b9d7d9' }}>Privacy Policy</a>
          <a href="#" className="hover:underline" style={{ color: '#b9d7d9' }}>Terms of Service</a>
          <a href="#" className="hover:underline" style={{ color: '#b9d7d9' }}>Contact Us</a>
        </div>
        <p className="text-sm" style={{ color: '#e1f3f4' }}>
          &copy; {new Date().getFullYear()} MicroMatch. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
