import { expect } from 'chai'

import wesync, { Opts } from '../src'

describe('my test', function () {
  it('should equal hello', async function () {
    // Arrange
    const opts: Opts = { selector: '.test' }

    // Act
    const res = wesync(opts)

    // Assert
    expect(res).to.be.an('object')
    expect(res).to.haveOwnProperty('addListener')
    expect(res.addListener).to.be.a('function')
  })
})
