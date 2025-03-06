import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../utils/db';
import { User } from '../entities/user';

const userRepository = AppDataSource.getRepository(User);
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// User Signup
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'Email already registered' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({ email, password: hashedPassword, name });
    await userRepository.save(user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error signing up' });
  }
};

// User Login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
