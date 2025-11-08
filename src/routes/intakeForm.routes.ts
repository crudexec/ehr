import { Router } from 'express';
import IntakeFormController from '../controllers/IntakeFormController';
import { authenticate } from '../middleware/auth';
import { validatePagination } from '../middleware/validation';

const router = Router();

router.use(authenticate);

router.post('/', IntakeFormController.create.bind(IntakeFormController));
router.get('/:id', IntakeFormController.getById.bind(IntakeFormController));
router.get(
  '/user/:userId',
  validatePagination,
  IntakeFormController.getByUserId.bind(IntakeFormController)
);
router.put('/:id', IntakeFormController.update.bind(IntakeFormController));
router.patch('/:id/status', IntakeFormController.updateStatus.bind(IntakeFormController));
router.delete('/:id', IntakeFormController.delete.bind(IntakeFormController));

export default router;
