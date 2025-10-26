import express from 'express';
import { AuthController } from '../controllers/authController';
import { validateRequest, authValidation } from '../middleware/validation';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/register', validateRequest(authValidation.register), AuthController.register);
router.post('/login', validateRequest(authValidation.login), AuthController.login);
router.get('/profile', auth as any, AuthController.getProfile);
router.put('/profile', auth as any, AuthController.updateProfile);

export default router;