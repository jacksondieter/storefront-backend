import { Router } from 'express'
import orderController from '../controllers/orders'
import { protect } from '../../service/auth'

const router = Router()

router
  .route('/')
  .get(protect, orderController.getOrderByUser)
  .post(protect, orderController.create)

router
  .route('/completed')
  .get(protect, orderController.getOrderByUserCompleted)

router
  .route('/:id')
  .get(protect, orderController.show)
  .post(protect, orderController.update)
  .delete(protect, orderController.destroy)

router
  .route('/:id/products')
  .get(protect, orderController.getProducts) 
  .post(protect, orderController.addProduct) 

router
  .route('/:id/products/:product_id')
  .delete(protect, orderController.deleteProduct) 

export default router
