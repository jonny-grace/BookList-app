import { Router } from 'express';
import { BookController } from '../controller/BookController';

const router = Router();
const bookController = new BookController();

router.get('/', bookController.getAll.bind(bookController));
router.post('/:id/buy', bookController.buyBook.bind(bookController));

export default router;