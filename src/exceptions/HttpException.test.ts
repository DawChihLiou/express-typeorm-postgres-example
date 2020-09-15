import HttpException from './HttpException'

describe('HttpException', () => {
  it('should contain all properties', () => {
    const error = new HttpException(422, 'error message', {
      detail: 'error detail',
    })
    expect(error).toHaveProperty('status', 422)
    expect(error).toHaveProperty('message', 'error message')
    expect(error).toHaveProperty('detail', { detail: 'error detail' })
  })
})
