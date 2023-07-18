import { DataTypes } from 'sequelize';
import db from '../db/db.js';
import User from './User.js';

// 😏
// O sequelize permite por ter relacionamento
// hasMany, um método pra puxar todos os comentarios
// post.getComments();

const Comment = db.define('Comment', {
  stars: {
    type: DataTypes.DECIMAL,
    required: true,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    required: true,
    allowNull: true,
  },
});

Comment.belongsTo(User);

export default Comment;
