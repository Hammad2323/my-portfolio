export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "portfolio_uploads"); 

  const isVideo = file.type.startsWith("video/");
  const resourceType = isVideo ? "video" : "image";

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dyntvayku/${resourceType}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Upload failed");

    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  }
};
