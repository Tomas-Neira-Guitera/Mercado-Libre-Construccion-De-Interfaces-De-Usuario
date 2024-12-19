package org.tp1.dto

import model.Cart

class CartDTO(cart: Cart) {
    val user = SimpleUser(cart.user)
    val items = cart.items.map { ItemDTO(it) }
}
