"use client"

import { useRef } from "react"
import { Upload, User } from "lucide-react"

export default function ImageUpload({ currentImage, onImageChange, className = "" }) {
  const fileInputRef = useRef(null)

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB")
        return
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        onImageChange(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div onClick={handleImageClick} className="cursor-pointer relative group">
        {currentImage ? (
          <img
            src={currentImage || "/placeholder.svg"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4"
            style={{ borderColor: "#c4b590" }}
          />
        ) : (
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold border-4"
            style={{
              backgroundColor: "#f9f2e0",
              color: "#7b3b3b",
              borderColor: "#c4b590",
            }}
          >
            <User size={48} />
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Upload size={24} className="text-white" />
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      {/* Removed the explicit "Upload Photo" button */}
    </div>
  )
}
