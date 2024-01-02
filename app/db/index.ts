import { Pool, PoolConfig } from 'pg'

const POOL_CONFIG: PoolConfig = {
  user: process.env.POSTGRES_USER || 'jordanfrankfurt',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DATABASE || 'jrank',
  password: process.env.POSTGRES_PASSWORD || undefined,
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
  ssl: {
    ca: process.env.DO_CA_CERTIFICATE
      ? Buffer.from(process.env.DO_CA_CERTIFICATE, 'base64').toString('utf8')
      : undefined,
  },
}

const pool = new Pool(POOL_CONFIG)

export const query = (text: string, params: any[]) => {
  return pool.query(text, params)
}
