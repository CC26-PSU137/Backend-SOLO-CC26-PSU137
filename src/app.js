import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import classificationRoutes from './routes/classificationRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/classification', classificationRoutes);

app.use(errorMiddleware);

export default app;