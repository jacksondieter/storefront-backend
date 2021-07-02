import { getMany, getOne, createOne, updateOne, deleteOne, getFilter } from '../service/database'

export interface Product {
  name: string
  price: number
  category: string
}
export interface Products extends Product {
  id: number
}

export class ProductStore {
  async index(): Promise<{ data?: Products[]; error?: string }> {
    const sql = 'SELECT * FROM products'
    const { data, error } = (await getMany<Products>(sql)) as { data: Products[]; error: string }
    if (error) return { error }
    return { data }
  }

  async show(id: number): Promise<{ data?: Products; error?: string }> {
    const sql = 'SELECT * FROM products WHERE id=($1)'
    const params = [id]
    const { data, error } = (await getOne<Products>(sql, params)) as { data: Products; error: string }
    if (error) return { error }
    return { data }
  }

  async create(p: Product): Promise<{ data?: Products; error?: string }> {
    const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
    const params = [p.name, p.price, p.category]
    const { data, error } = (await createOne<Products>(sql, params)) as { data: Products; error: string }
    if (error) return { error }
    return { data }
  }

  async update(p: Products): Promise<{ data?: Products; error?: string }> {
    const sql = 'UPDATE products SET name=$1, price=$2, category=$3 WHERE id=($4) RETURNING *'
    const params = [p.name, p.price, p.category, p.id]
    const { data, error } = (await updateOne<Products>(sql, params)) as { data: Products; error: string }
    if (error) return { error }
    return { data }
  }
  async delete(id: number): Promise<{ data?: string; error?: string }> {
    const sql = 'DELETE FROM products WHERE id=($1)'
    const params = [id]
    const { error: err } = (await deleteOne<Products>(sql, params)) as { data: Products; error: string }
    if (err) return { error: err }
    return { data: 'success' }
  }

  async getTopProducts(): Promise<{ data?: unknown[]; error?: string }> {
    const sql =
      'SELECT name, COUNT(*) FROM products INNER JOIN order_products ON products.id = order_products.product_id GROUP BY products.id ORDER BY count DESC LIMIT 5'
    const { data, error } = (await getMany<unknown>(sql)) as { data: unknown[]; error: string }
    if (error) return { error }
    return { data }
  }

  async productsByCategory(category: string): Promise<{ data?: unknown[]; error?: string }> {
    const sql = 'SELECT * FROM products WHERE category=$1'
    const params = [category]
    const { data, error } = (await getFilter<unknown>(sql, params)) as { data: unknown[]; error: string }
    if (error) return { error }
    return { data }
  }
}
