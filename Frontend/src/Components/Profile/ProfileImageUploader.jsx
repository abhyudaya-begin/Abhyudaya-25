import { useState, useRef, useDeferredValue, useEffect } from "react";
import toast from "react-hot-toast";

function ProfileImageUploader({ image, setImage, setIMageUpdated }) {
  const [uploading, setUploading] = useState(false);
  const [tempImage, setTempImage] = useState("https://placehold.co/100x100");
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (event) => {
    const avatarFile = event.target.files[0]; // Get the selected file
    if (!avatarFile) return;

    const imageUrl = URL.createObjectURL(avatarFile); // Convert file to URL
    setImage(avatarFile);
    setTempImage(imageUrl);

    setIMageUpdated(true);
  };

  return (
    <div className="flex items-center justify-between px-4">
      <img
        src={tempImage}
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-white/30 shadow-lg object-cover"
      />
      <button
        type="button"
        onClick={triggerFileInput}
        className="p-2 px-4 rounded-lg bg-white/10 cursor-pointer hover:bg-white/20 transition text-white"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
        accept="image/*"
      
      />
    </div>
  );
}

export default ProfileImageUploader;
