import request, { agent } from 'supertest'
import app from '../src/server'

const req = request(app)
const authReq = agent(app)

beforeAll(async () => {
  const response = await authReq
    .post('/signup')
    .send({ username: 'tester', password: 'tester', first_name: 'Test', last_name: 'Testing' })
  authReq.auth(response.body.token, { type: 'bearer' })
})

describe('Test route', () => {
  it('signup endpoint', () => {
    expect(authReq.auth).toBeDefined()
  })
  it('login endpoint', (done) => {
    req
      .post('/login')
      .send({ username: 'tester', password: 'tester' })
      .expect(201, done)
  })
  it('gets the main endpoint', (done) => {
    req
      .get('/')
      .expect(200, done)
  })
  it('gets the api endpoint', (done) => {
    req
      .get('/api')
      .expect(200, done)
  })

  it('gets the profile endpoint', (done) => {
    authReq
      .get('/profile')
      .expect(200, done)
  })
})

describe('Products route', () => {
  it('gets the api/products endpoint', (done) => {
    req
      .get('/api/products')
      .expect(200, done)
  })

  it('post the api/products endpoint', (done) => {
    authReq
      .post('/api/products')
      .send({ name: 'tester', price: '10', category: 'test' })
      .expect(200, done)
  })
  it('gets the api/products/1 endpoint', (done) => {
    req
      .get('/api/products/1')
      .expect(200, done)
  })
  it('update the api/products/1 endpoint', (done) => {
    authReq
      .post('/api/products/1')
      .send({ name: 'testing', price: '20', category: 'test' })
      .expect(200, done)
  })
  it('delete the api/products/1 endpoint', (done) => {
    authReq
      .post('/api/products')
      .send({ name: 'tester2', price: '100', category: 'test' })
    authReq
      .delete('/api/products/2')
      .expect(200, done)
  })
  it('gets the api/products/popular endpoint', (done) => {
    req
      .get('/api/products/popular')
      .expect(200, done)
  })
  it('gets the /api/products/by_category/:category endpoint', (done) => {
    req
      .get('/api/products/by_category/test')
      .expect(200, done)
  })
})

describe('Orders route', () => {
  it('post the api/orders endpoint', (done) => {
    authReq
      .post('/api/orders')
      .send({ status: 'completed' })
      .expect(200, done)
  })
  it('gets the api/orders endpoint', (done) => {
    authReq
      .get('/api/orders')
      .expect(200, done)
  })
  it('gets the api/orders/1 endpoint', (done) => {
    authReq
      .get('/api/orders/1')
      .expect(200, done)
  })
  it('post the api/orders/1 endpoint', (done) => {
    authReq
      .post('/api/orders/1')
      .send({ status: 'active' })
      .expect(200, done)
  })
  it('delete the api/orders endpoint', (done) => {
    authReq
      .post('/api/orders')
      .send({ status: 'completed' })
    authReq
      .delete('/api/orders/2')
      .expect(200, done)
  })
  it('gets the api/orders/completed endpoint', (done) => {
    authReq
      .get('/api/orders/completed')
      .expect(200, done)
  })
  it('post the api/orders/1/products endpoint', (done) => {
    authReq
      .post('/api/orders/1/products')
      .send({ product_id: 1, quantity: 20 })
      .expect(200, done)
  })
  it('gets the api/orders/1/products endpoint', (done) => {
    authReq
      .get('/api/orders/1/products')
      .expect(200, done)
  })
  it('delete the api/orders/1/products endpoint', (done) => {
    authReq
      .delete('/api/orders/1/products/1')
      .expect(200, done)
  })
})

describe('Users route', () => {
  it('gets the api/admin/users endpoint', (done) => {
    authReq
      .get('/api/admin/users')
      .expect(200, done)
  })
  it('create user endpoint', (done) => {
    authReq
      .post('/api/admin/users')
      .send({ username: 'test', password: 'tester2' })
      .expect(200, done)
  })
  it('gets the api/admin/orders endpoint', (done) => {
    authReq
      .get('/api/admin/orders')
      .expect(200, done)
  })
  it('gets the api/admin/users/1 endpoint', (done) => {
    authReq
      .get('/api/admin/users/1')
      .expect(200, done)
  })
  it('delete the api/admin/users/2 endpoint', (done) => {
    authReq
      .delete('/api/admin/users/2')
      .expect(200, done)
  })
})