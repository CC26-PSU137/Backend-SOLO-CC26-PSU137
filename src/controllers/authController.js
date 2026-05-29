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
    const validatedData =
      registerSchema.safeParse(req.body);

    if (!validatedData.success) {
      return response(
        res,
        400,
        validatedData.error.issues[0].message
      );
    }

    const { email, password } =
      validatedData.data;

    const existingUser =
      await prisma.user.findUnique({
        where: { email },
      });

    if (existingUser) {
      return response(
        res,
        409,
        'Email already exists'
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },

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
    console.error(
      'Register Error:',
      error
    );

    return response(
      res,
      500,
      'Internal Server Error'
    );
  }
};

export const login = async (req, res) => {
  try {
    // VALIDATION
    const validatedData =
      loginSchema.safeParse(req.body);

    if (!validatedData.success) {
      return response(
        res,
        400,
        validatedData.error.issues[0].message
      );
    }

    const { email, password } =
      validatedData.data;

    const user =
      await prisma.user.findUnique({
        where: { email },
      });

    if (!user) {
      return response(
        res,
        401,
        'Invalid email or password'
      );
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return response(
        res,
        401,
        'Invalid email or password'
      );
    }

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
    console.error(
      'Login Error:',
      error
    );

    return response(
      res,
      500,
      'Internal Server Error'
    );
  }
};