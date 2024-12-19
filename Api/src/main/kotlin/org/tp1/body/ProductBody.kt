package org.tp1.body

import model.Characteristic
import model.Shipping

class ProductBody(
    val title: String,
    val description: String,
    var price: Double,
    val images: MutableList<String>,
    val stock: Int,
    val shipping: Shipping,
    val characteristics: MutableList<Characteristic>,
    val categoryId: String
)


