import { Router } from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { getAll, getOne, updateStatus, remove } from '../controllers/admin.controller.js';
import { getAll as getCallbacks, updateStatus as updateCallStatus } from '../controllers/requestCall.controller.js';

const router = Router();
router.use(protect);

router.get('/applications',              getAll);
router.get('/applications/:id',          getOne);
router.patch('/applications/:id/status', updateStatus);
router.delete('/applications/:id',       remove);

router.get('/request-calls',                  getCallbacks);
router.patch('/request-calls/:id/status',     updateCallStatus);

export default router;
