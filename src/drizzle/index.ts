import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'
import * as schema from './schema'
import config from '../config/config'

const connection = connect({
  url: config.databaseUrl
})

const db = drizzle(connection, {
  schema
})

export { db }
