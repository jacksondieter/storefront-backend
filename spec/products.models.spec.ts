import { ProductStore } from '../src/models/products'

const store = new ProductStore()

describe('Products model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  })
  it('should have an index method', async () => {
    const result = await store.index()
    expect(result.data).toEqual([])
  })
  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })
  it('should have a show method', () => {
    expect(store.create).toBeDefined()
  })
  it('should have a show method', () => {
    expect(store.update).toBeDefined()
  })
  it('should have a show method', () => {
    expect(store.delete).toBeDefined()
  })
  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'Scuba',
      price: 250,
      category: 'sports'
    })
    expect(result.data).toEqual({
      id: 1,
      name: 'Scuba',
      price: 250,
      category: 'sports'
    })
  })
  it('index method should return a list of products', async () => {
    const result = await store.index()
    expect(result.data).toEqual([{
      id: 1,
      name: 'Scuba',
      price: 250,
      category: 'sports'
    }])
  })

  it('show method should return the correct product', async () => {
    const result = await store.show(1)
    expect(result.data).toEqual({
      id: 1,
      name: 'Scuba',
      price: 250,
      category: 'sports'
    })
  })

  it('delete method should remove the product', async () => {
    await store.create({
      name: 'Laptop',
      price: 2,
      category: 'technology'
    })
    await store.delete(2)
    const result = await store.index()

    expect(result.data).toEqual([{
      id: 1,
      name: 'Scuba',
      price: 250,
      category: 'sports'
    }])
  })
})
