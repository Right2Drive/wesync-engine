import { expect } from 'chai'

import { engine } from '../src'

describe('my test', function () {
  it('should equal hello', async function () {
    // Arrange
    const arr = [1, 12, 13, 6]

    // Act
    const res = engine(arr)

    // Assert
    expect(res).to.contain(12)
    expect(res).to.contain(13)
    expect(res).to.not.contain(1)
    expect(res).to.not.contain(6)
  })
})
