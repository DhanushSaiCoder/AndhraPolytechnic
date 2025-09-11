const CLOUD_NAME = "drs62gumc"; // Your Cloudinary cloud name
const UPLOAD_PRESET = "First Preset"; // Your upload preset
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/`;

// Helper to build transformations string
const buildTransformations = (transformations = {}) => {
  const defaults = ["f_auto", "q_auto", "dpr_auto"];
  const custom = Object.entries(transformations).map(([key, value]) => `${key}_${value}`);
  return [...defaults, ...custom].join(",");
};

export const getOptimizedImageUrl = (publicId, transformations = {}) => {
  if (!publicId) return "";
  if (publicId.startsWith('http')) {
    return publicId;
  }
  const appliedTransformations = buildTransformations(transformations);
  return `${BASE_URL}${appliedTransformations}/${encodeURIComponent(publicId)}`;
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Unknown error during image upload.");
    }

    if (!data.public_id) {
      throw new Error("public_id not found in Cloudinary response.");
    }

    return data.public_id;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};
