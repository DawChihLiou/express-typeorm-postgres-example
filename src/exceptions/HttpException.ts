class HttpException extends Error {
  public status: number
  public message: string
  public detail: any
  constructor(status: number, message: string, detail?: any) {
    super(message)
    this.status = status
    this.message = message
    this.detail = detail
  }
}

export default HttpException
