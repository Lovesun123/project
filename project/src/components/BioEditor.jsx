import React, { useState } from 'react';
import Button from './Button';
import { Edit3, Save, X } from 'lucide-react';

export default function BioEditor({ bio, onBioChange, className = "" }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempBio, setTempBio] = useState(bio || '');

  const handleSave = () => {
    onBioChange(tempBio);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempBio(bio || '');
    setIsEditing(false);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 
          className="text-2xl font-semibold border-b-2 pb-2"
          style={{ 
            color: '#7b3b3b',
            borderColor: '#7b3b3b'
          }}
        >
          Bio
        </h3>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-full"
            style={{ 
              backgroundColor: '#7b3b3b',
              color: '#ffffff'
            }}
          >
            <Edit3 size={16} />
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={tempBio}
            onChange={(e) => setTempBio(e.target.value)}
            placeholder="Tell us about yourself..."
            className="w-full h-32 p-3 border-2 rounded-md resize-none"
            style={{ 
              borderColor: '#b9d7d9',
              backgroundColor: '#ffffff'
            }}
            maxLength={500}
          />
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              className="px-4 py-2 rounded-full flex items-center gap-2"
              style={{ 
                backgroundColor: '#7b3b3b',
                color: '#ffffff'
              }}
            >
              <Save size={16} />
              Save
            </Button>
            <Button
              onClick={handleCancel}
              className="px-4 py-2 rounded-full flex items-center gap-2"
              style={{ 
                backgroundColor: '#b9d7d9',
                color: '#7b3b3b'
              }}
            >
              <X size={16} />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {bio ? (
            <p 
              className="text-base leading-relaxed p-3 rounded border"
              style={{ 
                color: '#7b3b3b',
                backgroundColor: '#f9f2e0',
                borderColor: '#c4b590'
              }}
            >
              {bio}
            </p>
          ) : (
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
          )}
          <button 
            onClick={() => setIsEditing(true)}
            className="text-sm underline hover:opacity-80"
            style={{ color: '#7b3b3b' }}
          >
            Update Bio
          </button>
        </div>
      )}
    </div>
  );
}
