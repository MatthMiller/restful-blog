import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (email && password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          res.status(401).json({ message: 'E-mail unregistered' });
          return;
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
          res.status(401).json({ message: 'Invalid credentials' });
          return;
        }

        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h',
          }
        );

        // Colocar isso no middleware de autenticação
        // que vai rodar nas rotas protegidas
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token with .env password:', decodedToken);

        res.status(200).json({ token, message: 'User logged with success!' });
      } else {
        res.status(400).json({ message: 'E-mail and password are required' });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: 'Error on login' });
    }
  }

  static async register(req, res) {
    const { name, email, password } = req.body;

    if (name && email && password) {
      const lengthCheck =
        [name, email, password].filter(
          (actualString) => actualString.length <= 100
        ).length === 3;
      if (!lengthCheck) {
        res.status(400).json({ message: 'The maximum of characters is 100' });
        return;
      }

      const isExistingUser = await User.findOne({ where: { email } });
      if (isExistingUser) {
        res.status(400).json({ message: 'E-mail already in use' });
        return;
      }

      const isValidPassword =
        password.length >= 6 &&
        password.match(/[!#$@]/g) &&
        password.match(/[\d]/g);
      if (!isValidPassword) {
        res.status(400).json({
          message:
            'Password must have at least 6 characters, one special character (!, #, $, @) and one number',
        });
        return;
      }
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = {
        name,
        email,
        password: hashPassword,
      };

      await User.create(newUser);
      res.status(200).json({ message: 'User successfully created' });
    } else {
      res
        .status(400)
        .json({ message: 'Name, e-mail and password are required' });
      return;
    }
    try {
    } catch (error) {
      res.status(500).json({ message: 'Error registering user' });
    }
  }
}

export default AuthController;
