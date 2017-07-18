const {Sequelize, sequelize} = require('../db')

const ArticleSchema = {
  id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true},
  title: {type: Sequelize.STRING, allowNull: false},
  body: {type: Sequelize.TEXT, allowNull: false},
  like: {type: Sequelize.INTEGER, defaultValue: 0},
  collection: {type: Sequelize.INTEGER, defaultValue: 0}
}

module.exports = sequelize.define('Article', ArticleSchema, {timestamps: false})
