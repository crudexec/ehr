import { Router } from 'express';
import UserController from '../controllers/UserController';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../types';
import { validatePagination } from '../middleware/validation';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', validatePagination, UserController.getAll.bind(UserController));
router.get('/:id', UserController.getById.bind(UserController));

// Admin only routes
router.post(
  '/',
  authorize(UserRole.ADMINISTRATOR),
  UserController.create.bind(UserController)
);
router.put('/:id', UserController.update.bind(UserController));
router.patch(
  '/:id/role',
  authorize(UserRole.ADMINISTRATOR),
  UserController.updateRole.bind(UserController)
);
router.patch(
  '/:id/deactivate',
  authorize(UserRole.ADMINISTRATOR),
  UserController.deactivate.bind(UserController)
);
router.patch(
  '/:id/activate',
  authorize(UserRole.ADMINISTRATOR),
  UserController.activate.bind(UserController)
);
router.delete(
  '/:id',
  authorize(UserRole.ADMINISTRATOR),
  UserController.delete.bind(UserController)
);

export default router;
