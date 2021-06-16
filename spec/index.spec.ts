import request from 'supertest'
import app from '../src/server'

const req = request(app)
describe('Test endpoint responses', () => {
  it('gets the main endpoint', (done) => {
    req
      .get('/')
      .expect(200, done)
  })
})