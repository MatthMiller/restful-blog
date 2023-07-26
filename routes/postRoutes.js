import { Router } from 'express';
import PostController from '../controllers/PostController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const postRoutes = Router();

postRoutes.get('/all/:order?', PostController.getAll);
postRoutes.get('/:id', PostController.getOne);
postRoutes.get('/search/:term', PostController.search);
postRoutes.post('/create/:id', authMiddleware, PostController.create);
// view/get
// edit/put (auth)
// delete/delete (auth)

export default postRoutes;
