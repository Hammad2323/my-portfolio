export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "portfolio_uploads"); // 👈 Replace this
  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dyntvayku/upload", // 👈 Replace this
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await response.json();
  return data.secure_url;
};
