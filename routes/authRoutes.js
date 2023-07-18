import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const authRoutes = Router();

authRoutes.post('/register', AuthController.register);
authRoutes.post('/login', AuthController.login);

export default authRoutes;
