import { Pool } from 'pg'
import config from '../config/index'

let client: Pool = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
})

if (config.env === 'test') {
  client = new Pool({
    host: config.host,
    database: config.database_test,
    user: config.user,
    password: config.password,
  })
}

export function queryDBwithConf(option: string) {
  return async function <T>(sql: string, params?: (string | number)[]): Promise<{ data?: T[] | T; error?: string }> {
    try {
      const conn = await client.connect()
      let data: T[] | T
      switch (option) {
        case 'many':
          data = (await conn.query(sql)).rows
          break
        case 'one':
          data = (await conn.query(sql, params)).rows[0]
          break
        case 'filter':
          data = (await conn.query(sql, params)).rows
          break
        default:
          data = (await conn.query(sql)).rows[0]
          break
      }
      conn.release()
      return { data }
    } catch (e) {
      return { error: `Unable work with DB, ${e}` }
    }
  }
}

export const getMany = queryDBwithConf('many') // sql rows
export const getOne = queryDBwithConf('one') //sql params rows[0]
export const createOne = queryDBwithConf('one') //sql params rows[0]
export const updateOne = queryDBwithConf('one') //sql params rows[0]
export const deleteOne = queryDBwithConf('one') //sql params rows[0]
export const getFilter = queryDBwithConf('filter') //sql params row
