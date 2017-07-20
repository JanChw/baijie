const gm = require('gm')

module.exports = {
  crop (req, res, next) {
    let basePath = './public/imgs'
    let {width, height, x, y, name} = req.body
    gm(`${basePath}/${name}`)
      .crop(width, height, x, y)
      .font('Helvetica.ttf', 18)
      .drawText(width * (1 / 16), height * (9 / 10), 'Created by JanChow')
      .write(`${basePath}/print_${name}`, (err) => {
        if (err) return next(err)
        return res.send('剪裁成功')
      })
  }
}
