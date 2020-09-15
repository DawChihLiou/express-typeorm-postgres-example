import { restaurantBookByIdAction } from '@controller/RestaurantBookByIdAction'
import { restaurantDeleteByIdAction } from '@controller/RestaurantDeleteByIdAction'
import { restaurantGetByIdAction } from '@controller/RestaurantGetByIdAction'
import { restaurantSaveAction } from '@controller/RestaurantSaveAction'
import { restaurantUpdateByIdAction } from '@controller/RestaurantUpdateByIdAction'
import { chefGetByIdAction } from '@controller/ChefGetByIdAction'
import { chefSaveAction } from '@controller/ChefSaveAction'

export const routes = [
  {
    path: '/chefs/:id',
    method: 'get',
    action: chefGetByIdAction,
  },
  {
    path: '/chefs',
    method: 'post',
    action: chefSaveAction,
  },
  {
    path: '/restaurants/:id',
    method: 'get',
    action: restaurantGetByIdAction,
  },
  {
    path: '/chefs/:id/restaurant',
    method: 'post',
    action: restaurantSaveAction,
  },
  {
    path: '/restaurants/:id',
    method: 'put',
    action: restaurantUpdateByIdAction,
  },
  {
    path: '/restaurants/:id',
    method: 'delete',
    action: restaurantDeleteByIdAction,
  },
  {
    path: '/restaurants/:id/booking',
    method: 'post',
    action: restaurantBookByIdAction,
  },
]
