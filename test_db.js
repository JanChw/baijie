const sequelize = require('./db')

sequelize.authenticate()
  .then(() => console.log('database connected'))
  .catch((err) => console.log(err))
