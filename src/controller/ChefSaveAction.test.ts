import Chef from '@entity/Chef'
import AlreadyExistsException from '@exceptions/AlreadyExistsException'
import ValidationException from '@exceptions/ValidationException'
import * as typeorm from 'typeorm'
import { chefSaveAction } from './ChefSaveAction'

const mockRequest: any = (name?: string) => ({ body: { name } })
const mockResponse: any = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    setHeader: jest.fn().mockReturnThis(),
  }
}
const mockNext = () => jest.fn()

;(typeorm as any).getRepository = jest.fn()

describe('chefSaveAction', () => {
  it('should call next function with AlreadyExistsException', async () => {
    const req = mockRequest('tester123456')
    const res = mockResponse()
    const next = mockNext()
    const chef = new Chef()
    chef.id = '123'
    chef.name = req.body.name
    ;(typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(chef),
    })
    await chefSaveAction(req, res, next)
    expect(next).toHaveBeenCalledWith(
      new AlreadyExistsException(`Chef "${req.body.name}"`)
    )
  })

  it('should call next function with ValidationException without name in request body', async () => {
    const req = mockRequest()
    const res = mockResponse()
    const next = mockNext()
    const chef = new Chef()
    chef.id = '123'
    ;(typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(undefined),
    })
    await chefSaveAction(req, res, next)
    expect(next).toHaveBeenCalledWith(new ValidationException({}))
  })

  it('should save and set saved record in response data', async () => {
    const req = mockRequest('longer chef tester name')
    const res = mockResponse()
    const next = mockNext()
    const chef = new Chef()
    chef.id = '123'
    chef.name = req.body.name
    ;(typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(undefined),
      save: () => Promise.resolve(chef),
    })
    await chefSaveAction(req, res, next)
    expect(res.json).toHaveBeenCalledWith({ data: chef })
  })
})
