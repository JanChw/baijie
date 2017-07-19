const ccap = require('ccap')()
module.exports = {
  captcha (req, res, next) {
    let [txt, buf] = ccap.get()
    res.cookie('txtinfo', txt)
    res.set('Content-Type', 'image/bmp')
    return res.end(buf)
  }
}
