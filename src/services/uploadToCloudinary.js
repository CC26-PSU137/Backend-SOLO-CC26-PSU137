import cloudinary from '../config/cloudinary.js';

const uploadToCloudinary = async (
  fileBuffer
) => {
  return new Promise(
    (resolve, reject) => {
      const stream =
        cloudinary.uploader.upload_stream(
          {
            folder: 'solo',
          },

          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(
                result.secure_url
              );
            }
          }
        );

      stream.end(fileBuffer);
    }
  );
};

export default uploadToCloudinary;