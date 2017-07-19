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
      let {verifycode, mobile, txtinfo} = req.body
      let _user = await User.findOne({where: {mobile}})
      // 未注册
      if (!_user) return res.json({data: '用户未注册', success: false})
      // 手机验证码或图片验证码不正确
      let isPassed = verifycode === req.cookies.verifycode && txtinfo === req.cookies.txtinfo
      if (!isPassed) return res.json({data: '验证码不对', success: false})
      // 用户登陆发送jsonwebtoken
      let user = permit(_user)('id', 'name')
      let token = jwt.sign(user, process.env.MYKEY, { expiresIn: '24h' })
      return res.json({data: token, success: true})
    } catch (err) {
      next(err)
    }
  }
}
