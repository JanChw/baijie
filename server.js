const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const fs = require('fs')

const {sequelize} = require('./db')
const apiV1 = require('./api/v1/router')
sequelize.sync()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(cookieParser())
app.use(apiV1)

// 错误页面处理
app.use((req, res, next) => {
  res.sendFile(`${__dirname}/404.html`)
})

// 异常错误日志
app.use((err, req, res, next) => {
  let writeStream = fs.createWriteStream(`${__dirname}/logs/errors.log`)
  writeStream.write(`${err.stack}\n`)
  writeStream.write('==========================\n')
  writeStream.end()
})

app.listen(8000, () => {
  console.log('server starting on port 8080')
})
