import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import intakeFormRoutes from './intakeForm.routes';
import eventRoutes from './event.routes';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'EHR System API is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/intake-forms', intakeFormRoutes);
router.use('/events', eventRoutes);

export default router;
