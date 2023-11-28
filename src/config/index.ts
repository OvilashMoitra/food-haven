import dotenv from 'dotenv'
dotenv.config()

export const config = {
    port: process.env.PORT || 9000,
    node_env: process.env.NODE_ENV,
    mongodb_connection_url: process.env.MONGODB_CONNECTION_URL
}