const jwt = require('jsonwebtoken')
module.exports = async (req, res, next) => {
  let token = req.headers.authorization
  if (!token) return res.json({data: '请先登录', success: false})
  try {
    let user = await jwt.verify(token, process.env.MYKEY)
    req.currentUser = user
    next()
  } catch (err) {
    return res.json({data: '登陆失败', success: false})
  }
}
