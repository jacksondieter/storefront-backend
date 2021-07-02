import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config/index'
import { User, UserStore } from '../models/users'

const store = new UserStore()

export const createToken = function (id: number): string {
  return jwt.sign({ id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  })
}

export const verifyToken = function (token: string): JwtPayload {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
}

export const protect = async function (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req?.headers?.authorization?.split('Bearer ')[1]
    if (!token) {
      return res.status(401).end()
    }
    const payload = await verifyToken(token)
    req.body.user_id = payload.id
    next()
  } catch (error) {
    console.error(error)
    return res.status(401).end()
  }
}

export const signin = async function (req: Request, res: Response): Promise<Response | void> {
  const user = {
    username: req.body.username,
    password: req.body.password,
  }
  if (!user.username || !user.password) {
    return res.status(400).send('username and password are equired')
  }
  const { data, error: noUser } = await store.getId(user.username)
  if (noUser || !data) {
    return res.status(401).send('No authorization')
  }
  const { error: notMatch } = await store.checkPassword(user.username, user.password)
  if (notMatch) {
    return res.status(401).send(notMatch)
  }
  const token: string = createToken(data.id)
  return res.status(201).send({ token })
}

export const signup = async function (req: Request, res: Response): Promise<Response | void> {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  }
  if (!user.username || !user.password) {
    return res.status(400).send('username and password are equired')
  }
  const { data, error } = await store.create(user)
  if (error || !data) {
    res.status(400).json(error)
    return
  }
  const token: string = createToken(data.id)
  res.send({ token })
}
