import HttpException from './HttpException'

class ValidationException extends HttpException {
  constructor(detail: any) {
    super(400, 'Validation error', detail)
  }
}

export default ValidationException
