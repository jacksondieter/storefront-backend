import { Router } from 'express'
import productController from '../controllers/products'
import { protect } from '../../service/auth'

const router = Router()

router
  .route('/')
  .get(productController.index)
  .post(protect, productController.create)

router
  .route('/popular')
  .get(productController.getTopProducts)

router
  .route('/by_category/:id')
  .get(productController.productsByCategory)

router
  .route('/:id')
  .get(productController.show)
  .post(protect, productController.update)
  .delete(protect, productController.destroy)

export default router