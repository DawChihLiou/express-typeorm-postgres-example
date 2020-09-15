import Restaurant from '@entity/Restaurant'
import Chef from '@entity/Chef'
import Location from '@entity/Location'
import NotFoundException from '@exceptions/NotFoundException'
import ValidationException from '@exceptions/ValidationException'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'

/**
 * Create a restaurant under a chef
 * @params {uuid} id: chef id
 * @body {object}: restaurant properties
 */
export async function restaurantSaveAction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const chefRepository = getRepository(Chef)
  const chef = await chefRepository.findOne(req.params.id)

  if (!chef) {
    next(new NotFoundException(`Chef "${req.params.id}"`))
    return
  }
  if (!req.body.location) {
    next(new ValidationException('location is required'))
    return
  }
  const restaurantRepository = getRepository(Restaurant)

  const location = new Location()
  location.city = req.body.location.city
  location.state = req.body.location.state
  location.country = req.body.location.country
  location.zipCode = req.body.location.zipCode
  location.address = req.body.location.address

  const restaurant = new Restaurant()
  restaurant.name = req.body.name
  restaurant.rating = req.body.rating
  restaurant.category = req.body.category
  restaurant.image = req.body.image
  restaurant.popularity = req.body.popularity
  restaurant.badge = req.body.badge
  restaurant.availability = req.body.availability
  restaurant.location = location
  restaurant.chef = chef

  const errors = await validate(restaurant)

  if (errors.length > 0) {
    next(new ValidationException(errors))
    return
  }
  const results = await restaurantRepository.save(restaurant)
  res.status(200).json({ data: results })
}
