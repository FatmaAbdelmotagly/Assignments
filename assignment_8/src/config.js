import {config} from 'dotenv'
import {resolve} from 'node:path'
export const NODE_ENV = process.env.NODE_ENV
config({path : resolve(`.env.${NODE_ENV}`) });

export const PORT = process.env.PORT

export const DB_URI = process.env.DB_URI

export const DB_NAME = process.env.DB_NAME
