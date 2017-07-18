const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

const {sequelize} = require('./db')
const apiV1 = require('./api/v1/router')
sequelize.sync()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(apiV1)

app.listen(8080, () => {
  console.log('server starting on port 8080')
})
