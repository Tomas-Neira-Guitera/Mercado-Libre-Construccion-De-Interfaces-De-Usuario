package org.tp1.dto

import model.Product

class ProductDTO (product: Product) {
    val id = product.id
    val owner = SimpleUser(product.owner)
    val title = product.title
    val description = product.description
    val images = product.images
    val stock = product.stock
    val price = product.price
    val shipping = product.shipping
    val characteristics = product.characteristics
    val category = product.category
    val question = product.questions.map { QuestionDTO(it) }

}