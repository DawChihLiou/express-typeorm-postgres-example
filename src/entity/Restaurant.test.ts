import { Validator } from 'class-validator'
import { createRestaurant } from '../__fixtures__/mockRestaurant'
import Restaurant from './Restaurant'
import Location from './Location'

const validator = new Validator()

describe('Restaurant', () => {
  it('should fail all the validation rules for no optional property', async () => {
    const tester = new Restaurant()
    const errors = await validator.validate(tester)
    expect(errors).toHaveLength(7)
  })

  it('should not allow name less than 10 characters', async () => {
    const tester = createRestaurant()
    tester.name = 'test'
    const errors = await validator.validate(tester)
    expect(errors).toHaveLength(1)
    expect(errors[0].constraints).toHaveProperty('minLength')
  })

  it('should not allow category other than the enum and show custom message', async () => {
    const tester = createRestaurant()
    tester.category = 'fast-food'
    const errors = await validator.validate(tester)
    expect(errors).toHaveLength(1)
    expect(errors[0].constraints).toHaveProperty(
      'matches',
      'category can be either fine-dinning, street-food, casual, ethnic, family-style'
    )
  })

  it('should only allow image url', async () => {
    const tester = createRestaurant()
    tester.image = 'test'
    const errors = await validator.validate(tester)
    expect(errors).toHaveLength(1)
    expect(errors[0].constraints).toHaveProperty('isUrl')
  })

  it('should not allow popularity within the range [0, 1000]', async () => {
    const tester = createRestaurant()
    tester.popularity = -1
    tester.badge = 'awf'
    let errors = await validator.validate(tester)
    expect(errors).toHaveLength(1)
    expect(errors[0].constraints).toHaveProperty('min')

    tester.popularity = 2000
    tester.badge = 'awesome'
    errors = await validator.validate(tester)
    expect(errors).toHaveLength(1)
    expect(errors[0].constraints).toHaveProperty('max')
  })

  it('should not allow badge that does not align with popularity', async () => {
    const tester = createRestaurant()
    tester.popularity = 299
    tester.badge = 'awesome' // should be awf
    let errors = await validator.validate(tester)
    expect(errors).toHaveLength(1)
    expect(errors[0].constraints).toHaveProperty(
      'isBadgeColorAlignedWith',
      'popularity badge should be "awf" when popularity <= 300, "meh" when popularity <=700, or "awesome" otherwise.'
    )

    tester.popularity = 600
    tester.badge = 'awesome' // should be meh
    errors = await validator.validate(tester)
    expect(errors).toHaveLength(1)
    expect(errors[0].constraints).toHaveProperty('isBadgeColorAlignedWith')

    tester.popularity = 900
    tester.badge = 'meh' // should be awesome
    errors = await validator.validate(tester)
    expect(errors).toHaveLength(1)
    expect(errors[0].constraints).toHaveProperty('isBadgeColorAlignedWith')
  })

  it('should not allow negative availability', async () => {
    const tester = createRestaurant()
    tester.availability = -1
    const errors = await validator.validate(tester)
    expect(errors).toHaveLength(1)
    expect(errors[0].constraints).toHaveProperty('min')
  })

  it('should return validation error for invalid location', async () => {
    const tester = createRestaurant()
    tester.location = new Location()
    const errors = await validator.validate(tester)
    expect(errors).not.toHaveLength(0)
  })

  it('should not allow name rating outside of the range [0, 5]', async () => {
    const tester = createRestaurant()
    tester.rating = -1
    let errors = await validator.validate(tester)
    expect(errors).toHaveLength(1)
    expect(errors[0].constraints).toHaveProperty('min')

    tester.rating = 6
    errors = await validator.validate(tester)
    expect(errors).toHaveLength(1)
    expect(errors[0].constraints).toHaveProperty('max')
  })

  it('should pass all validation', async () => {
    const tester = createRestaurant()
    const errors = await validator.validate(tester)
    expect(errors).toHaveLength(0)
  })
})
