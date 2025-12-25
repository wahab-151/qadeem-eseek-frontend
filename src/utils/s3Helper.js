import axios from "axios";


/**
 * Upload a blob to S3 using a signed URL.
 * 
 * @param {Object} params
 * @param {string} params.url - The pre-signed S3 URL.
 * @param {Blob} params.blob - The file blob to upload.
 * @param {string} params.fileType - The MIME type of the file.
 * @returns {Promise<string|null>} - The clean S3 file URL or null on failure.
 */



export const uploadToS3 = async ({ url, blob, fileType }) => {
  try {
    const response = await axios.put(url, blob, {
      headers: {
        "Content-Type": fileType,
      },
    });

    if (response.status === 200) {
      console.log("✅ Upload successful", response)
      const cleanUrl = url.split("?")[0];
      console.log("cleanup url", cleanUrl);
      return cleanUrl;
    }

    console.warn("Upload failed with status:", response.status);
    return null;
  } catch (error) {
    console.error("❌ Error uploading to S3:", error);
    return null;
  }
};


export const getFileType = (file) => {
  const imageUrl = file?.preview;



  const fileName = imageUrl.split('/').pop();

  // 1. Extract extension (e.g. "webp")
  const ext = fileName.split('.').pop().toLowerCase();

  // 2. Map extension to MIME type
  const mimeTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
  };

  const fileType = mimeTypes[ext] || "application/octet-stream"; // fallback
  return {fileName,fileType};
}