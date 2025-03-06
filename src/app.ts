import express from 'express';
import cors from 'cors';
import { errorHandler } from './utils/errorHandler';
import { connectToDatabase } from './utils/db';
import { authRouter } from './routes/authRoutes';
import { authenticateJWT } from './middleware/authMiddleware';
import { adminRouter } from './routes/adminRoutes';
import { gameRouter } from './routes/gameRoutes';
import { userRouter } from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 5550;

// Database connection
connectToDatabase();

app.use(express.json());

// Enable CORS
app.use(cors({ origin: '*', credentials: true }));

// Public Routes
app.use('/api/auth', authRouter);

// Protected Routes
app.use('/api/profile', authenticateJWT, userRouter);
app.use('/api/games', authenticateJWT, gameRouter);
app.use('/api/admin', authenticateJWT, adminRouter);

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
