package org.tp1.dto

import model.Item

class ItemDTO(item: Item) {
    val product = SimpleProductDTO(item.product)
    val amount = item.amount
}
