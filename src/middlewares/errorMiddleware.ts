import { NextFunction, Request, Response } from 'express'
import HttpException from '@exceptions/HttpException'

function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status || 500
  const message = error.message || 'Something went wrong'
  const detail = error.detail || null

  res.setHeader('Content-Type', 'application/problem+json')
  res.status(status).json({
    error: { status, message, detail },
  })
}

export default errorMiddleware
