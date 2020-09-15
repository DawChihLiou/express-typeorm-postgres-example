import { Validator } from 'class-validator'
import { IsBadgeAlignedWith } from './validation'

const validator = new Validator()

describe('IsbadgeAlignedWith', () => {
  class Tester {
    @IsBadgeAlignedWith('popularity')
    public badge: string
    public popularity: number
  }

  it('should fail when badge color "awf" not aligns with popularity <=300', async () => {
    const model = new Tester()
    model.badge = 'awf'
    model.popularity = 501

    const errors = await validator.validate(model)
    expect(errors).toHaveLength(1)
  })

  it('should fail when badge color "meh" not aligns with popularity <=700 or >300', async () => {
    const model = new Tester()
    model.badge = 'meh'
    model.popularity = 800

    let errors = await validator.validate(model)
    expect(errors).toHaveLength(1)

    model.popularity = 299
    errors = await validator.validate(model)
    expect(errors).toHaveLength(1)
  })

  it('should fail when badge color "awesome" not aligns with popularity >700', async () => {
    const model = new Tester()
    model.badge = 'awesome'
    model.popularity = 700

    const errors = await validator.validate(model)
    expect(errors).toHaveLength(1)
  })

  it('should scceed when badge color "awf" aligns with popularity <=300', async () => {
    const model = new Tester()
    model.badge = 'awf'
    model.popularity = 299

    let errors = await validator.validate(model)
    expect(errors).toHaveLength(0)

    model.popularity = 300
    errors = await validator.validate(model)
    expect(errors).toHaveLength(0)
  })

  it('should scceed when badge color "meh" aligns with popularity <=700 and >300', async () => {
    const model = new Tester()
    model.badge = 'meh'
    model.popularity = 501

    let errors = await validator.validate(model)
    expect(errors).toHaveLength(0)

    model.popularity = 700
    errors = await validator.validate(model)
    expect(errors).toHaveLength(0)
  })

  it('should scceed when badge color "awesome" aligns with popularity >700', async () => {
    const model = new Tester()
    model.badge = 'awesome'
    model.popularity = 800

    const errors = await validator.validate(model)
    expect(errors).toHaveLength(0)
  })
})
