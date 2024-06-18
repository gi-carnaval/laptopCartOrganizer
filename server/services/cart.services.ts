import { cartRepository } from "../models/prismaClient"

async function create(cartName) {
    const existCart = await cartRepository.findFirst({
        where: {
            name: cartName
        }
    })

    if(existCart) {
        return "Carrinho já criado"
    }

    const cart = await cartRepository.create({
        data: {
            name: cartName
        }
    })

    return cart
}

export const cartServices = {
    create
}