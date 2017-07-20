const multer = require('multer')

let storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, 'public/imgs/')
  },

  filename (req, file, cb) {
    cb(null, `${Date.now()}.png`)
  }
})

module.exports = multer({storage}).any()
