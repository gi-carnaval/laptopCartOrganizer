import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const fastify = Fastify({
    logger: true
})

fastify.get('/laptops/', async (request, reply) => {
    try {
        const laptops = await prisma.laptop.findMany({
            include: { cart: true }
        })

        reply.send(laptops)
    } catch (err) {
        reply.status(500).send({ error: "Erro ao buscar notebooks" })
    }
})

fastify.post('/laptops', async (request, reply) => {
    try {
        const { laptopCode, cartId } = request.body;
        const laptop = await prisma.laptop.create({
            data: {
                laptopCode, cartId
            }
        })
        reply.send(laptop)
    } catch (err) {
        reply.status(500).send({error: `Erro ao criar notebook. Error: ${err}`})
    }
})

fastify.post('/carts', async (request, reply) => {
    try {
        const { cartName } = request.body;
        const cart = await prisma.cart.create({
            data: {
                name: cartName
            }
        })
        reply.status(200).send(cart)
    } catch (err) {
        reply.status(500).send({error: `Erro ao cadastrar carrinho. Erro: ${err}`})
    }
})

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1)
    }
    fastify.log.info(`Servidor rodando em ${address}`)
})