import NotFoundException from '@exceptions/NotFoundException'
import ValidationException from '@exceptions/ValidationException'
import mockRestaurant from '../__fixtures__/mockRestaurant'
import * as typeorm from 'typeorm'
import { restaurantUpdateByIdAction } from './RestaurantUpdateByIdAction'
import Restaurant from '@entity/Restaurant'

const mockRequest: any = (id: string, body: Record<string, any> = {}) => ({
  params: { id },
  body,
})
const mockResponse: any = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    setHeader: jest.fn().mockReturnThis(),
  }
}
const mockNext = () => jest.fn()

;(typeorm as any).getRepository = jest.fn()

describe('RestaurantUpdateByIdAction', () => {
  it('should call next function with NotFoundException', async () => {
    const req = mockRequest('tester123456')
    const res = mockResponse()
    const next = mockNext()

    ;(typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(undefined),
    })
    await restaurantUpdateByIdAction(req, res, next)
    expect(next).toHaveBeenCalledWith(
      new NotFoundException(`Restaurant "${req.params.id}"`)
    )
  })

  it('should call next function with ValidationException', async () => {
    const req = mockRequest('tester123456', { name: 'tes' })
    const res = mockResponse()
    const next = mockNext()
    const restaurant = Object.assign(new Restaurant(), mockRestaurant)

    ;(typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(restaurant),
      merge: () => {
        restaurant.name = req.body.name
      },
    })
    // should throw validation exception for name: insufficient length
    await restaurantUpdateByIdAction(req, res, next)
    expect(next).toHaveBeenCalledWith(new ValidationException({}))
  })

  it('should save and set saved record in response data', async () => {
    const req = mockRequest('tester123456', { availability: 0 })
    const res = mockResponse()
    const next = mockNext()
    const restaurant = Object.assign(new Restaurant(), mockRestaurant)

    ;(typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(restaurant),
      merge: () => {
        restaurant.availability = req.body.availability
      },
      save: () => Promise.resolve(restaurant),
    })
    await restaurantUpdateByIdAction(req, res, next)
    expect(res.json).toHaveBeenCalledWith({ data: restaurant })
  })
})
