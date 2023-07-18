import Post from '../models/Post.js';

class PostController {
  static async create(req, res) {
    console.log('PostController/create');
    res.status(200).json('ok');
  }
}

export default PostController;
