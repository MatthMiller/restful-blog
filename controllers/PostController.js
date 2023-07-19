import Post from '../models/Post.js';

class PostController {
  // Fazer depois no user uma rota de check-auth? só pra
  // ver se está logado com o token

  // post/all/recent
  // post/all/recent
  static async getAll(req, res) {}
  // post/:id
  static async getOne(req, res) {}

  // (get)post/search/ :term ?
  static async search(req, res) {}

  static async create(req, res) {
    try {
      const { id } = req.userData; // from middleware
      const { title, content } = req.body;

      if (title && content) {
        if (title.length >= 120) {
          res
            .status(400)
            .json({ message: 'Title must have less than 120 characters' });
          return;
        }

        await Post.create({ title, content, UserId: id });
        res
          .status(200)
          .json({ message: `Post '${title}' created with success!` });
        return;
      } else {
        res.status(400).json({ message: 'Title and content are required' });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: 'Error creating post' });
    }
  }
}

export default PostController;
