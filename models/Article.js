const {Sequelize, sequelize} = require('../db')
const User = require('./User')

const ArticleSchema = {
  id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true},
  title: {type: Sequelize.STRING, allowNull: false},
  body: {type: Sequelize.TEXT, allowNull: false},
  like: {type: Sequelize.INTEGER, defaultValue: 0},
  collection: {type: Sequelize.INTEGER, defaultValue: 0}
}
let Article = sequelize.define('Article', ArticleSchema, {timestamps: false})
User.hasMany(Article, {as: 'Articles', foreignKey: 'user_id'})
Article.belongsTo(User, {as: 'User', foreignKey: 'user_id'})
module.exports = Article
