import Post from '../models/Post.js';

class PostController {
  static async create(req, res) {
    console.log('PostController/create');
    console.log(req.userData);
    res.status(200).json('ok');
  }
}

export default PostController;
