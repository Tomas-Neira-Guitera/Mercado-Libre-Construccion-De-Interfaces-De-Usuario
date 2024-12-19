package org.tp1.dto
import model.User

class UserDTO (user: User) {
    val id = user.id
    val name = user.name
    val email = user.email
    val image = user.image
    val purchaseHistory = user.purchaseHistory.map { PurchaseHistoryDTO(it) }
    val products = user.products.map { SimpleProductDTO(it) }
    val likedProducts = user.likedProducts.map { SimpleProductDTO(it) }
    val saleHistory = user.salesHistory.map { SaleHistoryDTO(it) }
}