import NotFoundException from './NotFoundException'

describe('NotFoundException', () => {
  it('should contain all properties', () => {
    const error = new NotFoundException('module')
    expect(error).toHaveProperty('status', 404)
    expect(error).toHaveProperty('message', 'module is not found')
    expect(error).toHaveProperty('detail', undefined)
  })
})
