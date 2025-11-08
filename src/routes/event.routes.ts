import { Router } from 'express';
import EventController from '../controllers/EventController';
import { authenticate } from '../middleware/auth';
import { validatePagination } from '../middleware/validation';

const router = Router();

router.use(authenticate);

router.post('/', EventController.create.bind(EventController));
router.get('/', validatePagination, EventController.getAll.bind(EventController));
router.get('/my-events', EventController.getMyEvents.bind(EventController));
router.get('/date-range', EventController.getByDateRange.bind(EventController));
router.get('/:id', EventController.getById.bind(EventController));
router.put('/:id', EventController.update.bind(EventController));
router.patch('/:id/cancel', EventController.cancel.bind(EventController));
router.patch('/:id/complete', EventController.complete.bind(EventController));
router.delete('/:id', EventController.delete.bind(EventController));

export default router;
