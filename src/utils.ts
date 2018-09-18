import { Opts } from './types'

function validateOpts (opts: Opts) {
  if (typeof opts !== 'object') {
    throw new Error('opts must be an object')
  }

  const { selector } = opts
  if (typeof selector !== 'string') {
    throw new Error('\'selector\' is a required opt, and must be of type string')
  }
}

export { validateOpts }
