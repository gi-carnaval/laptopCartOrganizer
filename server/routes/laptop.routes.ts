import { laptopController } from "../controllers/laptop.controller";

export async function laptopRoutes(fastify, options) {
    fastify.get('/laptops', laptopController.getAllLaptopsFromSpecificCart)
    fastify.post('/laptops', laptopController.saveLaptop)
}
