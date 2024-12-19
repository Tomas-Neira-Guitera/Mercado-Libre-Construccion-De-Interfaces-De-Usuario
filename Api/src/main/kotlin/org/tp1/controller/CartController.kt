package org.tp1.controller
import org.tp1.dto.UserDTO
import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import io.javalin.http.UnauthorizedResponse
import model.*
import org.tp1.body.PaymentBody
import org.tp1.body.CartBody
import org.tp1.dto.CartDTO
import org.tp1.utils.getAuthUser
import service.MercadoLibreService
import java.time.DateTimeException
import java.time.LocalDateTime
import java.time.YearMonth
import java.time.format.DateTimeFormatter

class CartController(private val mercadoLibreService: MercadoLibreService) {

    fun getCart(ctx : Context) {
        val user = getAuthUser(ctx)
        try {
            val cart = mercadoLibreService.getCart(user.id)
            ctx.json(CartDTO(cart))
        } catch (e: UserException) {
            throw NotFoundResponse("User not found")
        }
    }

    fun updateCart(ctx : Context) {
        val body = ctx.bodyValidator(CartBody::class.java)
            .check({ it.productId.isNotEmpty() && it.productId.isNotBlank()  }, "productId cannot be blank")
            .check({ it.amount > 0  }, "amount cannot be empty")
            .getOrThrow {
                throw BadRequestResponse("Invalid product data or insufficient stock")
            }
        val user = getAuthUser(ctx)
        try {
            val cart = mercadoLibreService.updateItemCart(user.id, body.productId, body.amount)
            ctx.json(CartDTO(cart))
        } catch (e: UserException) {
            throw NotFoundResponse("User not found")
        } catch (e: ProductException) {
            throw NotFoundResponse("Product not found")
        }
    }

    fun removeProductCart(ctx : Context) {
        val idProduct = ctx.pathParam("id")
        if (idProduct.isBlank()) {
            throw BadRequestResponse("Invalid product id")
        }
        val user = getAuthUser(ctx)
        try {
            val cart = mercadoLibreService.deleteItemFromCart(user.id, idProduct)
            ctx.json(CartDTO(cart))
        } catch (e: UserException){
            throw NotFoundResponse("User not found")
        } catch (e: ProductException) {
            throw NotFoundResponse("Product not found")
        }
    }

    fun purchase(ctx : Context) {
        val body = ctx.bodyValidator(PaymentBody::class.java)
            .check({ it.cardNumber.isNotEmpty() && it.cardNumber.isNotBlank()  }, "cardNumber cannot be blank")
            .check({ it.expirationDate.isNotEmpty() && it.expirationDate.isNotBlank()  }, "expirationDate cannot be blank")
            .check({ it.cvv.isNotEmpty() && it.cvv.isNotBlank()  }, "cvv cannot be blank")
            .check({ it.name.isNotEmpty() && it.name.isNotBlank()  }, "name cannot be blank")
            .getOrThrow {
                throw BadRequestResponse("Invalid payment data")
            }

        val payment = Payment(body.cardNumber, expirationDateInLocalDateTime(body.expirationDate), body.cvv, body.name)
        val user = getAuthUser(ctx)
        try {
            mercadoLibreService.purchase(user.id, payment)
            ctx.json(UserDTO(user))
        } catch (e: UserException) {
            throw NotFoundResponse("User not found")
        } catch (e: PurchaseException) {
            throw BadRequestResponse("The cart is empty or items are not available")
        }
    }

    private fun expirationDateInLocalDateTime(expirationDate: String): LocalDateTime {
        try {
            val formatter = DateTimeFormatter.ofPattern("yyyy/MM")
            val expirationDateInLocalDate = YearMonth.parse(expirationDate, formatter)
            val expirationDateInLocalDateTime = expirationDateInLocalDate.atDay(1).atStartOfDay()
            return expirationDateInLocalDateTime
        } catch (e: DateTimeException) {
            throw BadRequestResponse("Invalid expiration date")
        }
    }
}