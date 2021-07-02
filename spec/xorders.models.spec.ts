import { OrderStore } from '../src/models/orders'

const store = new OrderStore()

describe('Orders model', () => {
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
  it('create method should add a order', async () => {
    const result = await store.create({
      status: 'completed',
      user_id: 1
    })
    expect(result.data).toEqual({
      id: 1,
      status: 'completed',
      user_id: 1
    })
  })
  it('update method should add a order', async () => {
    const result = await store.update({
      id: 1,
      status: 'active',
      user_id: 1
    })
    expect(result.data).toEqual({
      id: 1,
      status: 'active',
      user_id: 1
    })
  })
  it('index method should return a list of orders', async () => {
    const result = await store.index()
    expect(result.data).toEqual([{
      id: 1,
      status: 'active',
      user_id: 1
    }])
  })

  it('show method should return the correct order', async () => {
    const result = await store.show(1)
    expect(result.data).toEqual({
      id: 1,
      status: 'active',
      user_id: 1
    })
  })

  it('delete method should remove the order', async () => {
    await store.create({
      status: 'completed',
      user_id: 1
    })
    store.delete(2)
    const result = await store.index()
    expect(result.data).toEqual([{
      id: 1,
      status: 'active',
      user_id: 1
    }])
  })
  it('addProduct method should add a product to the order', async () => {
    const result = await store.addProduct({
      quantity: 10,
      product_id: 1,
      order_id: 1
    })
    expect(result.data).toBeTruthy()
  })
  it('getProducts method should get a product to the order', async () => {
    const result = await store.getProducts(1)
    expect(result.data).toEqual([
      {
        id: 1,
        name: 'Scuba',
        price: 250,
        category: 'sports',
        order_id: 1,
        product_id: 1,
        quantity: 10
      }
    ])
  })
  it('deleteProduct method should delete a product to the order', async () => {
    const result = await store.deleteProduct({
      product_id: 1,
      order_id: 1
    })
    expect(result.error).toBeFalsy()
  })
})
