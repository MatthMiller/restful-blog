import 'dotenv/config';
import express from 'express';
import db from './db/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import User from './models/User.js';
import Post from './models/Post.js';
import Comment from './models/Comment.js';
import specs from './docs/swagger.js';
import { serve, setup } from 'swagger-ui-express';

const app = express();
app.use(express.json());

app.use('/api-docs', serve, setup(specs));

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use('/', (req, res) => {
  res.status(404).json({ message: 'Status 404: Route not found' });
});

db.sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
