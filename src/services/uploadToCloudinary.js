import cloudinary
  from '../config/cloudinary.js';

const uploadToCloudinary = async (
  filePath
) => {
  const result =
    await cloudinary.uploader.upload(
      filePath,

      {
        folder: 'solo',
      }
    );

  return result.secure_url;
};

export default uploadToCloudinary;