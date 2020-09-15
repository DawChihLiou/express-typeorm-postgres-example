import Restaurant from '@entity/Restaurant'
import NotFoundException from '@exceptions/NotFoundException'
import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'

/**
 * Get a restaurant
 * @params {uuid} id: restaurant id
 */
export async function restaurantGetByIdAction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const repository = getRepository(Restaurant)
  const restaurant = await repository.findOne(req.params.id, {
    relations: ['location'],
  })

  if (!restaurant) {
    next(new NotFoundException(`Restaurant "${req.params.id}"`))
    return
  }
  res.status(200).json({ data: restaurant })
}
