import { UserStore } from '../src/models/users'

const store = new UserStore()

describe('Users model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  })
  it('should have an index method', async () => {
    expect(store.index).toBeDefined()
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
  it('create method should add a user', async () => {
    const result = await store.create({
      username: 'tester2',
      password: 'tester2',
      first_name: 'Test2',
      last_name: 'Testing2'
    })
    expect(result.data).toEqual({
      id: 2,
      username: 'tester2',
      first_name: 'Test2',
      last_name: 'Testing2'
    })
  })
  it('index method should return a list of users', async () => {
    const result = await store.index()
    expect(result.data).toEqual([
      {
        id: 1,
        username: 'tester',
        first_name: 'Test',
        last_name: 'Testing'
      },
      {
        id: 2,
        username: 'tester2',
        first_name: 'Test2',
        last_name: 'Testing2'
      }
    ])
  })

  it('show method should return the correct user', async () => {
    const result = await store.show(2)
    expect(result.data).toEqual({
      id: 2,
      username: 'tester2',
      first_name: 'Test2',
      last_name: 'Testing2'
    })
  })

  it('delete method should remove the user', async () => {
    await store.delete(2)
    const result = await store.index()

    expect(result.data).toEqual([{
      id: 1,
      username: 'tester',
      first_name: 'Test',
      last_name: 'Testing'
    }])
  })
})
