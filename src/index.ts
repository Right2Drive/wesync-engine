import * as R from 'ramda'

import { Opts, Engine, AddListener } from './types'
import { validateOpts } from './utils'

function getContainerFromSelector ({ selector }: Opts) {
  return document.querySelector(selector)
}

// TODO: How to create union function types for automatic type inference
function createAddListener (engine: Engine): AddListener {
  return (event, callback) => 'test'
}

function create (opts: Opts) {
  validateOpts(opts)

  // TODO: Check if curry is correct
  const getContainer = R.curry(getContainerFromSelector, opts)
}

export { create }
