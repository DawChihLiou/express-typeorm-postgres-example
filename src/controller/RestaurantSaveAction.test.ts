import NotFoundException from '@exceptions/NotFoundException'
import ValidationException from '@exceptions/ValidationException'
import { createRestaurant } from '../__fixtures__/mockRestaurant'
import * as typeorm from 'typeorm'
import { restaurantSaveAction } from './RestaurantSaveAction'
import Chef from '@entity/Chef'

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

describe('RestaurantSaveAction', () => {
  it('should call next function with NotFoundException when chef is not found', async () => {
    const req = mockRequest('tester123456')
    const res = mockResponse()
    const next = mockNext()

    ;(typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(undefined),
    })
    await restaurantSaveAction(req, res, next)
    expect(next).toHaveBeenCalledWith(
      new NotFoundException(`Chef "${req.params.id}"`)
    )
  })

  it('should call next function with ValidationException', async () => {
    const req = mockRequest('tester123456')
    const res = mockResponse()
    const next = mockNext()
    const chef = new Chef()
    chef.name = 'chef'
    ;(typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(chef),
    })
    // should throw validation exception for name: insufficient length
    await restaurantSaveAction(req, res, next)
    expect(next).toHaveBeenCalledWith(new ValidationException({}))
  })

  it('should save and set saved record in response data', async () => {
    const restaurant = createRestaurant()
    const req = mockRequest('tester123456', { ...restaurant })
    const res = mockResponse()
    const next = mockNext()
    const chef = new Chef()
    chef.name = 'chef'
    ;(typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(chef),
      save: () => Promise.resolve(restaurant),
    })
    await restaurantSaveAction(req, res, next)
    expect(res.json).toHaveBeenCalledWith({ data: restaurant })
  })
})
