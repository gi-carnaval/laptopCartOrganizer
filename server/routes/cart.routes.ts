import { cartController } from "../controllers/cart.controller";

async function cartRoutes(fastify, options) {
    fastify.post('/cart', cartController.saveCart)
}

export {cartRoutes}