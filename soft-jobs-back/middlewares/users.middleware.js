import usersModel from '../models/users.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyCredentials = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw { message: 'Email and password required.' };
    }

    const user = await usersModel.getUser(email);
    if (!user) {
      throw { message: `This email is not registered ${email}.` };
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      throw { message: 'Incorrect password.' };
    }

    next();
    
  } catch (error) {
    console.log('Error Login: ', error.message);
    res.status(500).json({ message: error.message });
  }
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw { message: 'Token not provided' };
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw { message: 'Invalid token format' };
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      throw { message: 'Invalid token' };
    }

    req.body.email = payload.email;

    next();
  } catch (error) {
    console.log('Error verifyToken: ', error.message);
    res.status(401).json({ message: error.message });
  }
};

export {
  verifyCredentials,
  verifyToken,
};