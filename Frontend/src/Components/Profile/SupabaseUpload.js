import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
 const uploadImage = async (image, fullName) => {
  if (!image) throw new Error("No file provided");

  try {
    // Generate a unique filename
  
    // const fileExt = file.name;
    const sanitizedFullName = fullName.replace(/\s+/g, "-"); // Replace spaces with dashes
    const fileName = `${sanitizedFullName}-${Date.now()}`;
    const filePath = `avatars/${fileName}`;

    // Upload image to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from("Profile_pictures")
      .upload(filePath, image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw new Error(uploadError.message);

    // Get the public URL
    const { data } = supabase.storage.from("Profile_pictures").getPublicUrl(filePath);
   
    return data.publicUrl;
  } catch (err) {
    console.error("Upload failed:", err.message);
    throw err;
  }
};

export default uploadImage;
