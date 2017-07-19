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

  async getMyArticles (req, res, next) {
    let id = req.currentUser.id
    let currentUser = await User.findById(id)
    console.log(currentUser)
    let myArticles = await currentUser.getArticles({attributes: ['title', 'body', ['user_id', 'owner']]})
    return res.json({data: myArticles, success: true})
  },

  verify (req, res, next) {
    let code = Math.floor(Math.random() * 1000000)
    res.cookie('verifycode', code)
    res.json({data: code, success: true})
  }
}
