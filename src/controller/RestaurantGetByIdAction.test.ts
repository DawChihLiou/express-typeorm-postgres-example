import NotFoundException from '@exceptions/NotFoundException'
import { createRestaurant } from '../__fixtures__/mockRestaurant'
import * as typeorm from 'typeorm'
import { restaurantGetByIdAction } from './RestaurantGetByIdAction'

const mockRequest: any = (id: string) => ({
  params: { id },
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

describe('RestaurantGetByIdAction', () => {
  it('should call next function with NotFoundException when restaurant is not found', async () => {
    const req = mockRequest('tester123456')
    const res = mockResponse()
    const next = mockNext()

    ;(typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(undefined),
    })
    await restaurantGetByIdAction(req, res, next)
    expect(next).toHaveBeenCalledWith(
      new NotFoundException(`Restaurant "${req.params.id}"`)
    )
  })

  it('should save and set saved record in response data', async () => {
    const req = mockRequest('tester123456')
    const res = mockResponse()
    const next = mockNext()
    const restaurant = createRestaurant()

    ;(typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(restaurant),
    })
    await restaurantGetByIdAction(req, res, next)
    expect(res.json).toHaveBeenCalledWith({ data: restaurant })
  })
})
