import { Request, Response } from 'express'
import { User, UserStore } from '../../models/users'

const store = new UserStore()

const index = async (req: Request, res: Response): Promise<void> => {
  const { data } = await store.index()
  res.json(data)
}

const show = async (req: Request, res: Response): Promise<void> => {
  const { data, error } = await store.show(parseInt(req.params.id))
  if (error) {
    res
      .status(400)
      .json(error)
    return
  }
  res.json(data)
}

const showMe = async (req: Request, res: Response): Promise<void> => {
  const { data, error } = await store.show(parseInt(req.body.user_id))
  console.log(error)
  if (error) {
    res
      .status(400)
      .json(error)
    return
  }
  res.json(data)
}

const create = async (req: Request, res: Response): Promise<void> => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }
  const { data, error } = await store.create(user)
  if (error) {
    res
      .status(400)
      .json(error)
    return
  }
  res.json(data)
}

const update = async (req: Request, res: Response): Promise<void> => {
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    id: parseInt(req.body.user_id)
  }
  const { data, error } = await store.update(user)
  if (error) {
    res
      .status(400)
      .json(error)
    return
  }
  res.json(data)
}

const destroy = async (req: Request, res: Response): Promise<void> => {
  const { data, error } = await store.delete(parseInt(req.params.id))
  if (error) {
    res
      .status(400)
      .json(error)
    return
  }
  res.json(data)
}

export default { index, show, create, update, destroy, showMe }