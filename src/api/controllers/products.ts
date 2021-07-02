import { Request, Response } from 'express'
import { Product, Products, ProductStore } from '../../models/products'

const store = new ProductStore()

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

const create = async (req: Request, res: Response): Promise<void> => {
  const product: Product = {
    name: req.body.name,
    price: parseInt(req.body.price),
    category: req.body.category
  }
  const { data, error } = await store.create(product)
  if (error) {
    res
      .status(400)
      .json(error)
    return
  }
  res.json(data)
}

const update = async (req: Request, res: Response): Promise<void> => {
  const product: Products = {
    name: req.body.name,
    price: parseInt(req.body.price),
    category: req.body.category,
    id: parseInt(req.params.id)
  }
  const { data, error } = await store.update(product)
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

const getTopProducts = async (req: Request, res: Response): Promise<void> => {
  const { data, error } = await store.getTopProducts()
  if (error) {
    res
      .status(400)
      .json(error)
    return
  }
  res.json(data)
}

const productsByCategory = async (req: Request, res: Response): Promise<void> => {
  const { data, error } = await store.productsByCategory(req.params.id)
  if (error) {
    res
      .status(400)
      .json(error)
    return
  }
  res.json(data)
}

export default { index, create, show, update, destroy, getTopProducts, productsByCategory }