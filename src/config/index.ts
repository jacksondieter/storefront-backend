import { config } from 'dotenv'

config()

const {
  POSTGRES_HOST: host = '',
  POSTGRES_DB: database = '',
  POSTGRES_USER: user = '',
  POSTGRES_PASSWORD: password = '',
  POSTGRES_TEST_DB: database_test = '',
  NODE_ENV: env = 'dev',
  BCRYPT_PASSWORD: pepper = '',
  SALT_ROUNDS: salt = '',
  TOKEN_SECRET: jwt = '',
  PORT: port = 3000,
} = process.env

const serverLog = (): void => {
  console.log(`Server listening on port ${port}`)
}

export default {
  host,
  database,
  user,
  password,
  database_test,
  env,
  secrets: {
    jwt,
    jwtExp: '100d',
  },
  port,
  hashing: {
    salt,
    pepper,
  },
  serverLog,
}
