import { Request, Response } from 'express'
import { Order, Orders, OrderStore } from '../../models/orders'

const store = new OrderStore()

export const index = async (req: Request, res: Response): Promise<void> => {
  const { data } = await store.index()
  res.json(data)
}

export const show = async (req: Request, res: Response): Promise<void> => {
  const { data, error } = await store.show(parseInt(req.params.id))
  if (error) {
    res
      .status(400)
      .json(error)
    return
  }
  res.json(data)
}

export const create = async (req: Request, res: Response): Promise<void> => {
  const order: Order = {
    status: req.body.status,
    user_id: parseInt(req.body.user_id)
  }
  const { data, error } = await store.create(order)
  if (error) {
    res
      .status(400)
      .json(error)
    return
  }
  res.json(data)
}

export const update = async (req: Request, res: Response): Promise<void> => {
  const order: Orders = {
    status: req.body.status,
    user_id: parseInt(req.body.user_id),
    id: parseInt(req.params.id)
  }
  const { data, error } = await store.update(order)
  if (error) {
    res
      .status(400)
      .json(error)
    return
  }
  res.json(data)
}

export const destroy = async (req: Request, res: Response): Promise<void> => {
  const { data, error } = await store.delete(parseInt(req.params.id))
  if (error) {
    res
      .status(400)
      .json(error)
    return
  }
  res.json(data)
}

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  const { data, error } = await store.getProducts(parseInt(req.params.id))
  if (error) {
    res
      .status(400)
      .json(error)
    return
  }
  res.json(data)
}
export const addProduct = async (req: Request, res: Response): Promise<void> => {
  const order_id: number = parseInt(req.params.id)
  const product_id: number = parseInt(req.body.product_id)
  const quantity: number = parseInt(req.body.quantity)

  const { data, error } = await store.addProduct({quantity, order_id, product_id})
  console.log(error)
  if (error) {
    res
      .status(400)
      .json(error)
    return
  }
  res.json(data)
}


export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const order_id: number = parseInt(req.params.id)
  const product_id: number = parseInt(req.params.product_id)

  const { data, error } = await store.deleteProduct({order_id, product_id})
  if (error) {
    res
      .status(400)
      .json(error)
    return
  }
  res.json(data)
}

export const getOrderByUser = async (req: Request, res: Response): Promise<void> => {
  const { data, error } = await store.getOrderByUser(parseInt(req.body.user_id))
  if (error) {
    res
      .status(400)
      .json(error)
    return
  }
  res.json(data)
}

export const getOrderByUserCompleted = async (req: Request, res: Response): Promise<void> => {
  const { data, error } = await store.getOrderByUserCompleted(parseInt(req.body.user_id))
  if (error) {
    res
      .status(400)
      .json(error)
    return
  }
  res.json(data)
}

export default { index, getOrderByUser, getOrderByUserCompleted, create, show, destroy, update, addProduct, deleteProduct, getProducts } 