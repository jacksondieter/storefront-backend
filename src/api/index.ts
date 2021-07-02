import { Router } from 'express'
import products from './routes/products'
import users from './routes/users'
import orders from './routes/orders'
import msgApi from '../service/index'
import userController from './controllers/users'
import { signin, signup, protect } from '../service/auth'

const home = msgApi('Home')
const apiREST = msgApi('Api')
const notFound = msgApi('404 Error', 404)

const login = Router()
login.route('/').post(signin)

const register = Router()
register.route('/').post(signup)

const profile = Router()
profile.route('/').get(protect, userController.showMe).post(protect, userController.update)

const api = Router()

api.get('/', apiREST)
api.use('/products', products)
api.use('/admin', users)
api.use('/orders', orders)

export { api, home, notFound, login, register, profile }
