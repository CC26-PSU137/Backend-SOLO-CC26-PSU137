import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png/;

  const isValid = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (isValid) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Only image files are allowed'
      )
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;