import Chef from '@entity/Chef'
import NotFoundException from '@exceptions/NotFoundException'
import * as typeorm from 'typeorm'
import { chefGetByIdAction } from './ChefGetByIdAction'

const mockRequest: any = (id: string) => ({ params: { id } })
const mockResponse: any = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    setHeader: jest.fn().mockReturnThis(),
  }
}
const mockNext = () => jest.fn()

;(typeorm as any).getRepository = jest.fn()

describe('ChefGetByIdAction', () => {
  it('should call next function with NotFoundException', async () => {
    const req = mockRequest('tester123456')
    const res = mockResponse()
    const next = mockNext()
    const chef = new Chef()
    chef.id = req.params.id
    chef.name = 'tester name'
    ;(typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(undefined),
    })
    await chefGetByIdAction(req, res, next)
    expect(next).toHaveBeenCalledWith(
      new NotFoundException(`Chef "${req.params.id}"`)
    )
  })

  it('should save and set saved record in response data', async () => {
    const req = mockRequest('tester123456')
    const res = mockResponse()
    const next = mockNext()
    const chef = new Chef()
    chef.id = req.params.id
    chef.name = 'tester name'
    ;(typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(chef),
    })
    await chefGetByIdAction(req, res, next)
    expect(res.json).toHaveBeenCalledWith({ data: chef })
  })
})
