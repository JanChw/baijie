const {Sequelize, sequelize} = require('../db')

const UserSchema = {
  id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true},
  name: {type: Sequelize.STRING, allowNull: false},
  mobile: {type: Sequelize.STRING, allowNull: false}
}

module.exports = sequelize.define('User', UserSchema, {timestamps: false, tableName: 'test_users'})
