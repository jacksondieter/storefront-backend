import express from 'express'
import { api, home, notFound, login, register, profile } from './api/index'
import config from './config/index'
import morgan from 'morgan'

const app: express.Application = express()

app.use(morgan('dev'))
app.use(express.json())

app.get('/', home)
app.use('/login', login)
app.use('/signup', register)
app.use('/profile', profile)
app.use('/api', api)
app.use('*', notFound)
app.listen(config.port, config.serverLog)

export default app
