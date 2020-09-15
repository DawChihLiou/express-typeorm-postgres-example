import AlreadyExistsException from './AlreadyExistsException'

describe('AlreadyExistsException', () => {
  it('should contain all properties', () => {
    const error = new AlreadyExistsException('module')
    expect(error).toHaveProperty('status', 422)
    expect(error).toHaveProperty('message', 'module already exists')
    expect(error).toHaveProperty('detail', undefined)
  })
})
