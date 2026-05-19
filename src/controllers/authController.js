import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import prisma from '../config/prisma.js';

import response from '../utils/response.js';

import {
  registerSchema,
  loginSchema,
} from '../validations/authValidation.js';

export const register = async (req, res) => {
  try {
    // VALIDATION
    const validatedData =
      registerSchema.parse(req.body);

    const { email, password } = validatedData;

    // CHECK USER
    const existingUser =
      await prisma.user.findUnique({
        where: { email },
      });

    if (existingUser) {
      return response(
        res,
        400,
        'Email already exists'
      );
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },

      // JANGAN RETURN PASSWORD
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    return response(
      res,
      201,
      'Register success',
      user
    );
  } catch (error) {
    return response(
      res,
      500,
      error.message
    );
  }
};

export const login = async (req, res) => {
  try {
    // VALIDATION
    const validatedData =
      loginSchema.parse(req.body);

    const { email, password } = validatedData;

    // FIND USER
    const user =
      await prisma.user.findUnique({
        where: { email },
      });

    if (!user) {
      return response(
        res,
        404,
        'User not found'
      );
    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return response(
        res,
        400,
        'Invalid credentials'
      );
    }

    // GENERATE TOKEN
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    return response(
      res,
      200,
      'Login success',
      {
        token,
      }
    );
  } catch (error) {
    return response(
      res,
      500,
      error.message
    );
  }
};