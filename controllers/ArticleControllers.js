const Article = require('../models/Article')
module.exports = {
  async createOne (req, res, next) {
    try {
      console.log(req.currentUser)
      let article = await Article.create(req.body)
      return res.json({data: article, success: true})
    } catch (err) {
      next(err)
    }
  },

  async removeOne (req, res, next) {
    try {
      let id = req.params.id
      console.log(req.currentUser)
      let result = await Article.destroy({where: {id}})
      if (!result) return next(new Error('要删除的文章不存在'))
      return res.json({data: result, success: true})
    } catch (err) {
      next(err)
    }
  },

  async updateOne (req, res, next) {
    try {
      let id = req.params.id
      console.log(req.currentUser)
      let article = await Article.findOne({where: {id}})
      if (!article) return next(new Error('要更新的文章不存在'))
      let result = await article.update(req.body, {fields: ['title', 'body']})
      return res.json({data: result, success: true})
    } catch (err) {
      next(err)
    }
  },

  async getOne (req, res, next) {
    try {
      let id = req.params.id
      let article = await Article.findById(id)
      if (!article) return next(new Error('要查找的文章不存在'))
      return res.json({data: article, success: true})
    } catch (err) {
      next(err)
    }
  },

  async getAllOrPaginate (req, res, next) {
    try {
      let {page, limit} = req.query
      if (page && limit) {
        // 文章总数
        let articlesCounts = await Article.findAndCount()
        let allArticlesCounts = articlesCounts.count
        page = parseInt(page, 10)
        limit = parseInt(limit, 10)
        // 分页
        let articles = await Article.findAll({offset: (page - 1) * limit, limit})
        return res.json({data: {articles, allArticlesCounts}, success: true})
      }
      let articles = await Article.findAll()
      return res.json({data: articles, success: true})
    } catch (err) {
      next(err)
    }
  }
}
