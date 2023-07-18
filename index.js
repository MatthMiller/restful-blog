import 'dotenv/config';
import express from 'express';
import db from './db/db.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import User from './models/User.js';
import Post from './models/Post.js';
import Comment from './models/Comment.js';

const app = express();

app.use(express.json());

app.use('/user', authRoutes);
app.use('/post', postRoutes);

app.use('/', (req, res) => {
  res.status(404).json({ message: '404: Page not found' });
});

db.sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
