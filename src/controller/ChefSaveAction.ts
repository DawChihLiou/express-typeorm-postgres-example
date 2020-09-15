import Chef from '@entity/Chef'
import AlreadyExistsException from '@exceptions/AlreadyExistsException'
import ValidationException from '@exceptions/ValidationException'
import { validate } from 'class-validator'

import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'

/**
 * Create a chef
 * @body {string} name
 */
export async function chefSaveAction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const repository = getRepository(Chef)
  const registered = await repository.findOne({
    where: { name: req.body.name },
  })

  if (registered) {
    next(new AlreadyExistsException(`Chef "${req.body.name}"`))
    return
  }
  const chef = new Chef()
  chef.name = req.body.name

  const errors = await validate(chef)

  if (errors.length > 0) {
    next(new ValidationException(errors))
    return
  }

  const result = await repository.save(chef)
  res.status(200).json({ data: result })
}
