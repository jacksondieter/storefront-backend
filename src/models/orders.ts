import { getMany, getOne, createOne, updateOne, deleteOne, getFilter } from '../service/database'
import { Products } from './products'

export interface Order {
  status: string
  user_id: number
}
export interface Orders extends Order {
  id: number
}

export interface OrdersProducts extends Products {
  quantity: number
  order_id: number
  product_id: number
}
export class OrderStore {
  async getOrderByUser(id_user: number): Promise<{ data?: unknown[]; error?: string }> {
    const sql = 'SELECT id,status FROM orders WHERE user_id=$1'
    const params = [id_user]
    const { data, error } = (await getFilter<unknown>(sql, params)) as { data: unknown[]; error: string }
    if (error) return { error }
    return { data }
  }

  async getOrderByUserCompleted(id_user: number): Promise<{ data?: unknown[]; error?: string }> {
    const sql = `SELECT id,status FROM orders WHERE user_id=$1 and status='completed'`
    const params = [id_user]
    const { data, error } = (await getFilter<unknown>(sql, params)) as { data: unknown[]; error: string }
    if (error) return { error }
    return { data }
  }

  async index(): Promise<{ data?: Orders[]; error?: string }> {
    const sql = 'SELECT * FROM orders'
    const { data, error } = (await getMany<Orders>(sql)) as { data: Orders[]; error: string }
    if (error) return { error }
    return { data }
  }

  async show(id: number): Promise<{ data?: Orders; error?: string }> {
    const sql = 'SELECT * FROM orders WHERE id=($1)'
    const params = [id]
    const { data, error } = (await getOne<Orders>(sql, params)) as { data: Orders; error: string }
    if (error) return { error }
    return { data }
  }

  async create(o: Order): Promise<{ data?: Orders; error?: string }> {
    const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'
    const params = [o.status, o.user_id]
    const { data, error } = (await createOne<Orders>(sql, params)) as { data: Orders; error: string }
    if (error) return { error }
    return { data }
  }

  async update(o: Orders): Promise<{ data?: Orders; error?: string }> {
    const sql = 'UPDATE orders SET status=$1, user_id=$2 WHERE id=($3) RETURNING *'
    const params = [o.status, o.user_id, o.id]
    const { data, error } = (await updateOne<Orders>(sql, params)) as { data: Orders; error: string }
    if (error) return { error }
    return { data }
  }

  async delete(id: number): Promise<{ data?: string; error?: string }> {
    const sql = 'DELETE FROM orders WHERE id=($1)'
    const params = [id]
    const { error } = (await deleteOne<Orders>(sql, params)) as { data: Orders; error: string }
    if (error) return { error }
    return { data: 'success' }
  }

  async getProducts(id: number): Promise<{ data?: OrdersProducts[]; error?: string }> {
    const sql =
      'SELECT * FROM products INNER JOIN order_products ON  products.id = order_products.product_id WHERE order_products.order_id=($1)'
    const params = [id]
    const { data, error } = (await getFilter<OrdersProducts[]>(sql, params)) as {
      data: OrdersProducts[]
      error: string
    }
    if (error) return { error }
    return { data }
  }
  async addProduct(p: {
    quantity: number
    order_id: number
    product_id: number
  }): Promise<{ data?: Order; error?: string }> {
    // get order to see if it is open
    const { data, error } = await this.show(p.order_id)
    if (error) return { error }
    if (data?.status == 'completed') {
      return { error: `Could not add product ${p.product_id} to order ${p.order_id} because order status is closed` }
    }
    const { data: resOrder, error: err } = await this._addProduct(p.quantity, p.order_id, p.product_id)
    if (err) return { error: err }
    return { data: resOrder }
  }

  async deleteProduct(p: { order_id: number; product_id: number }): Promise<{ data?: Order; error?: string }> {
    const { data, error } = await this.show(p.order_id)
    if (error) return { error }
    if (data?.status == 'completed') {
      return { error: `Could not delete product ${p.product_id} to order ${p.order_id} because order status is closed` }
    }
    const { data: resOrder, error: err } = await this._deleteProduct(p.order_id, p.product_id)
    if (err) return { error: err }
    return { data: resOrder }
  }

  async _addProduct(quantity: number, order_id: number, product_id: number): Promise<{ data?: Order; error?: string }> {
    const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
    const params = [quantity, order_id, product_id]
    const { data, error } = (await createOne<Orders>(sql, params)) as { data: Orders; error: string }
    if (error) return { error }
    return { data }
  }

  async _deleteProduct(id_order: number, id_product: number): Promise<{ data?: Orders; error?: string }> {
    const sql = 'DELETE FROM order_products WHERE order_id=($1) and product_id=($2)'
    const params = [id_order, id_product]
    const { data, error } = (await deleteOne<Orders>(sql, params)) as { data: Orders; error: string }
    if (error) return { error }
    return { data }
  }
}
