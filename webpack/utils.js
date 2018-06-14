const path = require('path')

exports.root = (...paths) => path.resolve(__dirname, '..', ...paths)
