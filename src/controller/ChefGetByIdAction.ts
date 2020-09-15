import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Chef from '@entity/Chef'
import NotFoundException from '@exceptions/NotFoundException'

/**
 * Get a chef with given id and list all associated restaurant
 * @params {uuid} id: chef id
 */
export async function chefGetByIdAction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const repository = getRepository(Chef)
  const chef = await repository.findOne(req.params.id, {
    relations: ['restaurants', 'restaurants.location'],
  })
  if (!chef) {
    next(new NotFoundException(`Chef "${req.params.id}"`))
    return
  }
  res.status(200).json({ data: chef })
}
