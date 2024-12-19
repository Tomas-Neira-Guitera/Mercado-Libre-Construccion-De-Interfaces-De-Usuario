package org.tp1.dto


import model.Product
import utilities.Page

class PageDTO (pageProducts: Page<Product>) {
    val products = pageProducts.items.map { SimpleProductDTO(it) }
    val currentPage = pageProducts.currentPage
    val amountOfPages = pageProducts.amountOfPages
    val amountOfElement = pageProducts.amountOfElements
}