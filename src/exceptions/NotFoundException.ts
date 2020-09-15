import HttpException from './HttpException'

class NotFoundException extends HttpException {
  constructor(entity: string) {
    super(404, `${entity} is not found`)
  }
}

export default NotFoundException
