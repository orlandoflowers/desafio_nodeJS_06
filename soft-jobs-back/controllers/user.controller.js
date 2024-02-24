import usersModel from '../models/users.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable');
}

const registrarUsuario = async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;
    if (!email || !password || !rol || !lenguage) {
      return res.status(422).json({ message: 'Missing fields in request body.' });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(422).json({ message: 'Password must contain numbers, letters and symbols (for example @$!%*#?&).' });
    }

    const verifyEmail = await usersModel.verifyUserEmail(email);
    if (verifyEmail) {
      return res.status(422).json({ message: 'Registration failed.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await usersModel.createUser({
      email,
      password: hashedPassword,
      rol,
      lenguage,
    });

    res.status(201).json({ message: 'User created successfully.' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields in request body.' });
    }

    const user = await usersModel.getUser(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    const user = await usersModel.getUser(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const { password, ...userWithoutPassword } = user;
    res.json([userWithoutPassword]);
  } catch (error) {
    console.log('Error get User: ', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const usersController = {
  registrarUsuario,
  login,
  getUser,
};