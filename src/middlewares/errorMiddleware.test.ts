import HttpException from '@exceptions/HttpException'
import errorMiddleware from './errorMiddleware'

const mockRequest: any = () => ({})
const mockResponse: any = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    setHeader: jest.fn().mockReturnThis(),
  }
}
const mockNext = () => jest.fn()

describe('errorMiddleware', () => {
  it('should set header', () => {
    const req = mockRequest()
    const res = mockResponse()
    const error = new HttpException(500, 'error')
    errorMiddleware(error, req, res, mockNext)
    expect(res.setHeader).toHaveBeenCalledTimes(1)
  })

  it('should include default message in response', () => {
    const req = mockRequest()
    const res = mockResponse()
    const error = new HttpException(400, '')
    errorMiddleware(error, req, res, mockNext)
    expect(res.json).toHaveBeenCalledWith({
      error: { status: 400, message: 'Something went wrong', detail: null },
    })
  })

  it('should include custom status, message, and detail in response', () => {
    const req = mockRequest()
    const res = mockResponse()
    const error = new HttpException(500, 'server error', {
      detail: 'error detail',
    })
    errorMiddleware(error, req, res, mockNext)
    expect(res.json).toHaveBeenCalledWith({
      error: {
        status: 500,
        message: 'server error',
        detail: { detail: 'error detail' },
      },
    })
  })
})
