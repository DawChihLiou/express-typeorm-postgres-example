import ValidationException from './ValidationException'

describe('ValidationException', () => {
  it('should contain all properties', () => {
    const error = new ValidationException({ detail: 'module' })
    expect(error).toHaveProperty('status', 400)
    expect(error).toHaveProperty('message', 'Validation error')
    expect(error).toHaveProperty('detail', { detail: 'module' })
  })
})
