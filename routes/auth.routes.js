import { Router } from 'express';
import { login, seed } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', login);
router.post('/seed',  seed);

export default router;
