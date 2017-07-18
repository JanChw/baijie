const Sequelize = require('sequelize')
const sequelize = new Sequelize('cws', 'root', '123esz', {
  host: 'bg.baijiegroup.com',
  dialect: 'mysql'
})
module.exports = {Sequelize, sequelize}
