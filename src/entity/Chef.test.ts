import { Validator } from 'class-validator'
import Chef from './Chef'

const validator = new Validator()

describe('Chef', () => {
  it('should have no validation error with chef name', async () => {
    const tester = new Chef()
    tester.name = 'Test Chef'
    const errors = await validator.validate(tester)
    expect(errors).toHaveLength(0)
  })
})
