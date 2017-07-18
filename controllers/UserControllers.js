const User = require('../models/User')

let permit = obj => (...args) => {
  let o = {}
  args.forEach(function (arg) { o[arg] = obj[arg] })
  return o
}
module.exports = {
  async registe (req, res, next) {
    try {
      let _user = await User.create(req.body, {fields: ['name', 'mobile']})
      let user = permit(_user)('name', 'mobile')
      return res.json({data: user, success: true})
    } catch (err) {
      next(err)
    }
  },

  verify (req, res, next) {
    let code = Math.floor(Math.random() * 1000000)
    res.cookie('verifycode', code, {expires: new Date(Date.now() + 1000 * 60)})
    res.json({data: code, success: true})
  }
}
