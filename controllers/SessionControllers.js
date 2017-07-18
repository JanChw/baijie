const User = require('../models/User')
const jwt = require('jsonwebtoken')
process.env.MYKEY = 'baijie'
let permit = obj => (...args) => {
  let o = {}
  args.forEach(function (arg) { o[arg] = obj[arg] })
  return o
}
module.exports = {
  async login (req, res, next) {
    try {
      let {verifycode, mobile} = req.body
      console.log(verifycode, mobile)
      let _user = await User.findOne({where: {mobile}})
      // 未注册
      if (!_user) return res.json({data: '用户未注册', success: false})
      // 验证码不正确
      if (verifycode !== req.cookies.verifycode) return res.json({data: '验证码不对或已过期(验证码周期为1分钟)', success: false})
      // 用户登陆发送jsonwebtoken
      let user = permit(_user)('id', 'name')
      let token = jwt.sign(user, process.env.MYKEY, { expiresIn: '24h' })
      return res.json({data: token, success: true})
    } catch (err) {
      next(err)
    }
  }
}
