package org.tp1.dto

import model.Product

class SimpleProductDTO(product: Product) {
    val id = product.id
    val title = product.title
    val description = product.description
    val price = product.price
    val images = product.images
    val owner = SimpleUser(product.owner)
    val category = product.category
    val shipping = product.shipping
}