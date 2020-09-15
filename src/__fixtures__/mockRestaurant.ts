import Restaurant from '@entity/Restaurant'
import Chef from '@entity/Chef'
import Location from '@entity/Location'

export const createRestaurant = () => {
  const chef = new Chef()
  chef.name = 'test chef'

  const location = new Location()
  location.city = 'city'
  location.state = 'state'
  location.country = 'country'
  location.address = 'address'
  location.zipCode = '12345'

  const restaurant = new Restaurant()
  restaurant.availability = 1
  restaurant.category = 'street-food'
  restaurant.chef = chef
  restaurant.image = 'https://mockurl.com/image'
  restaurant.location = location
  restaurant.name = 'test restaurant'
  restaurant.rating = 5
  restaurant.popularity = 1000
  restaurant.badge = 'awesome'
  return restaurant
}

export default createRestaurant()
