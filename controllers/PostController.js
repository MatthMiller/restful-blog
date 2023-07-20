import Post from '../models/Post.js';

console.log('teste'.substring(0, 500) + '...');

class PostController {
  // Fazer depois no user uma rota de check-auth? só pra
  // ver se está logado com o token

  static async getAll(req, res) {
    try {
      const orderParam = req.params.order;
      let order = '';

      if (orderParam === 'recent') {
        order = 'DESC';
      } else if (orderParam === 'old') {
        order = 'ASC';
      } else if (orderParam === undefined) {
        order = 'DESC';
      } else {
        res.status(400).json({ message: 'Invalid order filter' });
        return;
      }

      const filteredPosts = await Post.findAll({
        raw: true,
        order: [['createdAt', order]],
      });
      filteredPosts.forEach(({ content }) => {
        content =
          content.substring(0, 500) + (content.length >= 500 ? '...' : '');
      });

      res.status(200).json(filteredPosts);
    } catch (error) {
      res.status(500).json({ message: 'Error getting all posts' });
      return;
    }
  }

  // post/:id
  static async getOne(req, res) {
    try {
      const id = req.params.id;
    } catch (error) {
      res.status(500).json({ message: 'Error getting specific post' });
      return;
    }
    // Puxar comentários também
    // seria o post.getComments();
  }

  // post/:id/comments
  static async getOneComments(req, res) {}

  // (get)post/search/ :term ?
  static async search(req, res) {}

  static async create(req, res) {
    try {
      const { id } = req.userData; // from middleware
      const { title, content } = req.body;

      if (!title && !content) {
        res.status(400).json({ message: 'Title and content are required' });
        return;
      }

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
    } catch (error) {
      res.status(500).json({ message: 'Error creating post' });
    }
  }
}

export default PostController;
