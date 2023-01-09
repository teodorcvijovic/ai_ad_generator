import express from 'express'
import { GeneratorController } from '../controllers/generator.controller'

const generatorRouter = express.Router()

generatorRouter.route("").post(
    (request, response) => new GeneratorController().generateTitle(request, response)
)

export default generatorRouter