import Restaurant from '@entity/Restaurant'
import NotFoundException from '@exceptions/NotFoundException'
import ValidationException from '@exceptions/ValidationException'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'

/**
 * Book rooms at a restaurant with given number of rooms
 * @params {uuid} id: restaurant id
 * @body {number} numberOfGuests: number of rooms for a booking
 */
export async function restaurantBookByIdAction(
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
  found.availability -= req.body.numberOfGuests

  const errors = await validate(found)

  if (errors.length > 0) {
    next(new ValidationException(errors))
    return
  }
  const result = await repository.save(found)
  res.status(200).json({ data: result })
}
