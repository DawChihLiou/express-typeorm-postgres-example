import Restaurant from '@entity/Restaurant'
import NotFoundException from '@exceptions/NotFoundException'
import ValidationException from '@exceptions/ValidationException'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'

/**
 * Update a single restaurnt
 * @params {uuid} restaurnt id
 */
export async function restaurantUpdateByIdAction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const repository = getRepository(Restaurant)
  const found = await repository.findOne(req.params.id, {
    relations: ['location'],
  })

  if (!found) {
    next(new NotFoundException(`Restaurant "${req.params.id}"`))
    return
  }
  repository.merge(found, req.body)

  const errors = await validate(found)

  if (errors.length > 0) {
    next(new ValidationException(errors))
    return
  }
  const result = await repository.save(found)
  res.status(200).json({ data: result })
}
