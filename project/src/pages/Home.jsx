import React from 'react';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold" style={{ color: '#7b3b3b' }}>
          Welcome to MicroMatch
        </h1>
        <p className="text-lg" style={{ color: '#7b3b3b' }}>
          Coming soon! We're building something amazing.
        </p>
      </div>
    </div>
  );
}