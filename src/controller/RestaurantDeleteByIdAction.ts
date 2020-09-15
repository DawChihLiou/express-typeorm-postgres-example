import Restaurant from '@entity/Restaurant'
import NotFoundException from '@exceptions/NotFoundException'
import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'

/**
 * Delete a restaurant
 * @params {uuid} id: restaurant id
 */
export async function restaurantDeleteByIdAction(
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
  // hard remove only for demo purposes.
  const result = await repository.remove(found)
  res.status(200).json({ data: result })
}
