import { createClient } from "@supabase/supabase-js";
import { useState } from "react";



export const useSupabaseUpload = () => {
  const [error, setError] = useState(null);
  // Create Supabase client only once
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

  const supabase = createClient(supabaseUrl, supabaseKey);
  const uploadImage = async (file, userId = 'default') => {
    if (!file) {
      throw new Error("No file provided");
    }

    try {
      // Generate a unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload image to Supabase storage
      const { data, error: uploadError } = await supabase.storage
        .from("Profile_pictures")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false, // Don't overwrite existing files
        });

      if (uploadError) {
        setError(uploadError.message);
        throw new Error(uploadError.message);
      }

      // Get the public URL for the uploaded file
      const { data: urlData } = supabase.storage
        .from("Profile_pictures")
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { uploadImage, error };
};