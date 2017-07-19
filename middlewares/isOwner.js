const Article = require('../models/Article')
module.exports = async (req, res, next) => {
  let id = req.params.id
  let article = await Article.findById(id, {fields: [['user_id', 'owner']]})
  // if (!article) return res.json({data: '文章不存在', success: false})
  if (article && article.owner !== req.currentUser.id) return res.json({data: '无权限操作此文章', success: false})
  next()
}
