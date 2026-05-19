import express from 'express';

import upload from '../middlewares/uploadMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';

import {
  uploadImage,
  getHistory,
} from '../controllers/classificationController.js';

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  uploadImage
);

router.get(
  '/history',
  authMiddleware,
  getHistory
);

export default router;