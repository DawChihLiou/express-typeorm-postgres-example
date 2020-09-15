import HttpException from './HttpException'

class AlreadyExistsException extends HttpException {
  constructor(entity: string) {
    super(422, `${entity} already exists`)
  }
}

export default AlreadyExistsException
