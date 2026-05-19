import fs from 'fs';

import prisma from '../config/prisma.js';

import predictImage from '../services/aiService.js';

import uploadToCloudinary from '../services/uploadToCloudinary.js';

import response from '../utils/response.js';

export const uploadImage = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return response(
        res,
        400,
        'Image is required'
      );
    }

    const predictionResult =
      await predictImage(
        req.file.path
      );

    const imageUrl =
      await uploadToCloudinary(
        req.file.path
      );

    fs.unlinkSync(req.file.path);

    const classification =
      await prisma.classification.create({
        data: {
          imageUrl,

          prediction:
            predictionResult.prediction,

          confidence:
            predictionResult.confidence,

          description:
            predictionResult.description,

          userId: req.user.userId,
        },
      });

    return response(
      res,
      201,
      'Classification success',
      classification
    );
  } catch (error) {
    return response(
      res,
      500,
      error.message
    );
  }
};

export const getHistory = async (
  req,
  res
) => {
  try {
    const history =
      await prisma.classification.findMany({
        where: {
          userId: req.user.userId,
        },

        orderBy: {
          createdAt: 'desc',
        },
      });

    return response(
      res,
      200,
      'History fetched successfully',
      history
    );
  } catch (error) {
    return response(
      res,
      500,
      error.message
    );
  }
};