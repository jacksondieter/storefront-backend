import { config } from 'dotenv'

config()

const {
  POSTGRES_HOST: host = '',
  POSTGRES_DB: database = '',
  POSTGRES_USER:user = '',
  POSTGRES_PASSWORD:password = '',
  POSTGRES_TEST_DB:database_test = '',
  NODE_ENV:env = 'dev',
  BCRYPT_PASSWORD:pepper = '',
  SALT_ROUNDS:salt = '',
  TOKEN_SECRET:token = ''
} = process.env

export default {
  host,
  database,
  user,
  password,
  database_test,
  env,
  hashing:{
    salt,
    pepper
  },
  token
}