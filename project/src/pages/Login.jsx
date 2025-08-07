import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Label from '../components/Label';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold" style={{ color: '#7b3b3b' }}>
          Login
        </h1>
        <p className="text-lg" style={{ color: '#7b3b3b' }}>
          Coming soon! Login functionality is being developed.
        </p>
      </div>
    </div>
  );
}