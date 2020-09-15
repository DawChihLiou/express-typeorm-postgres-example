import { createLogger } from '@utils/logger'
import { createConnection } from 'typeorm'
import config from './ormconfig'

const log = createLogger('orm')

export async function createPostgresConnection() {
  try {
    await createConnection(config)
  } catch (error) {
    log(error)
    throw error
  }
}
