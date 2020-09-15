import { Validator } from 'class-validator'
import Location from './Location'

const validator = new Validator()

describe('Location', () => {
  it('should fail all the validation rules for no optional property', async () => {
    const tester = new Location()
    const errors = await validator.validate(tester)
    expect(errors).toHaveLength(5)
  })

  it('should only allow zip code in 5 characters', async () => {
    const tester = new Location()
    tester.city = 'city'
    tester.state = 'state'
    tester.country = 'country'
    tester.address = 'address'
    tester.zipCode = '123456'
    const errors = await validator.validate(tester)
    expect(errors).toHaveLength(1)
    expect(errors[0].constraints).toHaveProperty(
      'length',
      'zipCode must have a length of 5'
    )
  })

  it('should have no validation error', async () => {
    const tester = new Location()
    tester.city = 'city'
    tester.state = 'state'
    tester.country = 'country'
    tester.address = 'address'
    tester.zipCode = '00000'
    const errors = await validator.validate(tester)
    expect(errors).toHaveLength(0)
  })
})
