import { Router } from 'express';
import { create } from '../controllers/application.controller.js';

const router = Router();

router.post('/', create);

export default router;
