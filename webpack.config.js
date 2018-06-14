module.exports = () => {
  switch (process.env.WEBPACK_ENV) {
    case 'prod':
    case 'dev': {
      return require(`./webpack/${process.env.WEBPACK_ENV}.conf.js`)()
    }

    default: {
      throw new Error(`'${process.env.WEBPACK_ENV}' is not a valid build config`)
    }
  }
}
