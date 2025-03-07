import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useSupabaseUpload } from "./useSupabaseUpload";

function ProfileImageUploader({ image, setImage }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { uploadImage } = useSupabaseUpload();

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (event) => {
    const avatarFile = event.target.files[0]; // Get the selected file
    if (!avatarFile) return;

    setUploading(true); // Start loading indicator

    try {
      const imageUrl = await uploadImage(avatarFile);
      setImage(imageUrl); // Update image state to show uploaded image
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error("Error during image upload:", err);
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <img
        src={image}
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