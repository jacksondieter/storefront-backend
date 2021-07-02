import { Router } from 'express'
import userController from '../controllers/users'
import orderController from '../controllers/orders'
import { protect } from '../../service/auth'

const router = Router()

router
  .route('/users')
  .get(protect, userController.index)
  .post(protect, userController.create)

router
  .route('/orders')
  .get(protect, orderController.index)

router
  .route('/users/:id')
  .get(protect, userController.show)
  .delete(protect, userController.destroy)

export default router