import * as R from 'ramda'

function engine (arr: number[]) {
  return R.filter(
    R.lte(10),
  )(arr)
}

export { engine }
