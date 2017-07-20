const router = require('express').Router()
const path = require('path')

const UserControllers = require('../../controllers/UserControllers')
const SessionControllers = require('../../controllers/SessionControllers')
const ArticleControllers = require('../../controllers/ArticleControllers')
const UtilControllers = require('../../controllers/UtilControllers')

const uploadHandle = require('../../servers/uploadHandle')
const ImageHandle = require('../../servers/imageHandle')

const isLogined = require('../../middlewares/isLogined')
const isOwner = require('../../middlewares/isOwner')

router.get('/', (req, res, next) => {
  console.log(path.resolve(__dirname, '../../home.html'))
  res.end('welcome to baijie api of version 1')
})

// 用户注册
router.post('/account/registe', UserControllers.registe)

// 用户登陆登出
router.post('/account/login', SessionControllers.login)
// router.get('/account/logout', SessionController.logout)
// 用户的所有文章
router.get('/me/articles', isLogined, UserControllers.getMyArticles)
// 模拟生成手机验证码
router.get('/verifycode', UserControllers.verify)

// 文章资源
router.route('/articles')
      .get(ArticleControllers.getAllOrPaginate)
      .all(isLogined)
      .post(ArticleControllers.createOne)
router.route('/article/:id')
      .get(ArticleControllers.getOne)
      .all(isLogined, isOwner)
      .patch(ArticleControllers.updateOne)
      .delete(ArticleControllers.removeOne)

// 生成图片验证码
router.get('/util/captcha', UtilControllers.captcha)

// 上传文件
router.route('/upload')
      .get((req, res, next) => { res.sendFile(path.resolve(__dirname, '../../home.html')) })
      .post(uploadHandle, (req, res, next) => { res.redirect('/upload') })
// 图片剪裁
router.post('/util/crop', ImageHandle.crop)
module.exports = router
