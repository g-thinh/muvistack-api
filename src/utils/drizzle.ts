import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'
import config from './config'

import { accounts } from '@/api/accounts/account.model'

const connection = connect({
  url: config.databaseUrl
})

export const db = drizzle(connection, {
  schema: { accounts }
})
