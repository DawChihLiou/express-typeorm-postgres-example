import { ConnectionOptions } from 'typeorm'
import Restaurant from '@entity/Restaurant'
import Chef from '@entity/Chef'
import Location from '@entity/Location'

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true, // for demo purposes
  entities: [Chef, Restaurant, Location],
}

export default config
