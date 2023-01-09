import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import generatorRouter from './routes/generator.routes'
import { Configuration } from './utils/configuration'

dotenv.config()
const config = new Configuration()

const app = express()
app.use(cors())
app.use(express.json())

const router = express.Router()
router.use('/generator', generatorRouter)
 
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`))

export default config