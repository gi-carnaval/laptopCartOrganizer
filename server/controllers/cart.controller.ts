import { FastifyReply, FastifyRequest } from "fastify"
import { SaveCart } from "../resource/cart.resource"
import { cartServices } from "../services/cart.services"

async function saveCart(request: FastifyRequest<{ Body: SaveCart}>, reply: FastifyReply) {
    const { name } = request.body
    try {
        const cart = await cartServices.create(name)
        reply.status(200).send(cart)
    } catch (err) {
        reply.status(500).send({ error: 'Erro ao buscar notebooks do carrinho'})
    }
}

export const cartController = {
    saveCart
}