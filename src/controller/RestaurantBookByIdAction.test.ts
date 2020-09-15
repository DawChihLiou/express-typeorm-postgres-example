import NotFoundException from '@exceptions/NotFoundException'
import ValidationException from '@exceptions/ValidationException'
import { createRestaurant } from '../__fixtures__/mockRestaurant'
import * as typeorm from 'typeorm'
import { restaurantBookByIdAction } from './RestaurantBookByIdAction'

const mockRequest: any = (id: string, numberOfGuests: number) => ({
  params: { id },
  body: {
    numberOfGuests,
  },
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

describe('RestaurantBookByIdAction', () => {
  it('should call next function with NotFoundException', async () => {
    const req = mockRequest('tester123456')
    const res = mockResponse()
    const next = mockNext()

    ;(typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(undefined),
    })
    await restaurantBookByIdAction(req, res, next)
    expect(next).toHaveBeenCalledWith(
      new NotFoundException(`Restaurant "${req.params.id}"`)
    )
  })

  it('should call next function with ValidationException', async () => {
    const req = mockRequest('tester123456', 2)
    const res = mockResponse()
    const next = mockNext()
    const restaurant = createRestaurant()

    ;(typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(restaurant),
    })
    // should throw validation exception for name: insufficient length
    await restaurantBookByIdAction(req, res, next)
    expect(next).toHaveBeenCalledWith(new ValidationException({}))
  })

  it('should save and set saved record in response data', async () => {
    const req = mockRequest('tester123456', 1)
    const res = mockResponse()
    const next = mockNext()
    const restaurant = createRestaurant()

    ;(typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(restaurant),
      save: () => Promise.resolve(restaurant),
    })
    await restaurantBookByIdAction(req, res, next)
    expect(res.json).toHaveBeenCalledWith({ data: restaurant })
  })
})
