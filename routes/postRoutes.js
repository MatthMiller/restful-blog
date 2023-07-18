import { Router } from 'express';
import PostController from '../controllers/PostController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const postRoutes = Router();

postRoutes.post('/create', authMiddleware, PostController.create);
// view/get
// edit/put (auth)
// delete/delete (auth)

export default postRoutes;
