import { getMany, getOne, createOne, updateOne, deleteOne } from '../service/database'
import bcrypt from 'bcrypt'
import config from '../config/index'

interface UserData {
  first_name: string
  last_name: string
}
export interface UserAuth {
  username: string
  password: string
}

export interface UserId {
  id: number
}

export interface UserUpdate extends UserData, UserId {}

export interface UserI extends UserUpdate {
  username: string
}

export interface User extends UserData, UserAuth {}

export interface Users extends User, UserId {}

export class UserStore {
  async index(): Promise<{ data?: UserI[]; error?: string }> {
    const sql = 'SELECT id,username,first_name,last_name FROM users'
    const { data, error } = (await getMany<UserI>(sql)) as { data: UserI[]; error: string }
    if (error) return { error }
    return { data }
  }

  async show(id: number): Promise<{ data?: UserI; error?: string }> {
    const sql = 'SELECT id,username,first_name,last_name FROM users WHERE id=($1)'
    const params = [id]
    const { data, error } = (await getOne<UserI>(sql, params)) as { data: UserI; error: string }
    if (error) return { error }
    return { data }
  }

  async getId(username: string): Promise<{ data?: { id: number }; error?: string }> {
    const sql = 'SELECT id FROM users WHERE username=($1)'
    const params = [username]
    const { data, error } = (await getOne<{ id: number }>(sql, params)) as { data: { id: number }; error: string }
    if (error) return { error }
    return { data }
  }

  async create(u: User): Promise<{ data?: UserI; error?: string }> {
    const sql =
      'INSERT INTO users(first_name, last_name, username, password) VALUES($1,$2,$3,$4) RETURNING id,username,first_name,last_name'
    const hash = bcrypt.hashSync(u.password + config.hashing.pepper, parseInt(config.hashing.salt))
    const params = [u.first_name, u.last_name, u.username, hash]
    const { data, error } = (await createOne<UserI>(sql, params)) as { data: UserI; error: string }
    if (error) return { error }
    return { data }
  }

  async checkPassword(username: string, password: string): Promise<{ error: string | boolean }> {
    const sql = 'SELECT password FROM users WHERE username=($1)'
    const params = [username]
    const { data, error } = (await getOne<{ password: string }>(sql, params)) as {
      data: { password: string }
      error: string
    }
    if (error) return { error }
    if (data) {
      try {
        const isPass = await bcrypt.compare(password + config.hashing.pepper, data.password)
        if (isPass) return { error: false }
        return { error: 'No authorization' }
      } catch (e) {
        return { error: `No authorization, e= ${e}` }
      }
    }
    return { error: 'No authorization' }
  }
  async update(u: UserUpdate): Promise<{ data?: UserI; error?: string }> {
    const sql = 'UPDATE users SET first_name=$1, last_name=$2 WHERE id=($3) RETURNING id,username,first_name,last_name'
    const params = [u.first_name, u.last_name, u.id]
    const { data, error } = (await updateOne<UserI>(sql, params)) as { data: UserI; error: string }
    if (error) return { error }
    return { data }
  }
  async delete(id: number): Promise<{ data?: string; error?: string }> {
    const sql = 'DELETE FROM users WHERE id=($1)'
    const params = [id]
    const { error: e } = (await deleteOne<Users>(sql, params)) as { data: Users; error: string }
    if (e) return { error: e }
    return { data: 'success' }
  }
}
