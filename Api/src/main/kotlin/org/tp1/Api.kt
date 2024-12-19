package org.tp1

import data.initSystem
import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.*
import io.javalin.security.RouteRole
import org.tp1.controller.TokenController
import org.tp1.controller.CartController
import org.tp1.controller.ProductController
import org.tp1.controller.UserController
import org.tp1.controller.CategoryController


internal enum class Roles : RouteRole {
    ANYONE, USER
}

class Api {
    private val app: Javalin
    private val mercadoLibreService = initSystem()
    private val tokenController = TokenController(mercadoLibreService)
    private val cartController = CartController(mercadoLibreService)
    private val userController = UserController(mercadoLibreService, tokenController)
    private val productController = ProductController(mercadoLibreService)
    private val categoryController = CategoryController(mercadoLibreService)

    init {
        app = Javalin.create { config ->
            config.bundledPlugins.enableCors { cors -> cors.addRule { it.anyHost() } }
            config.http.defaultContentType = "application/json"
            config.router.apiBuilder {
                path("/login") {
                    post(userController::loginUser, Roles.ANYONE)
                }
                path("/register") {
                    post(userController::createUser, Roles.ANYONE)
                }
                path("user"){
                    get(userController::getUser, Roles.USER)
                }
                path("user/{id}") {
                    get(userController::getUserById, Roles.ANYONE)
                }
                path("/user/{id}/products") {
                    get(productController::getProductsByUser, Roles.ANYONE)
                }
                path("/products") {
                    get(productController::getAllProducts, Roles.ANYONE)
                    post(productController::createProduct, Roles.USER)

                }
                path("/products/{id}") {
                    get(productController::getProductById, Roles.ANYONE)
                    put(productController::updateProduct, Roles.USER)
                }
                path("/products/{id}/related"){
                    get (productController:: getRelatedProducts, Roles.ANYONE)
                }
                path ("/products/{id}/like"){
                    put(productController::toggleLike, Roles.USER)
                }
                path("/products/{id}/question"){
                    post(productController::addQuestion, Roles.USER)
                }
                path("/products/{id}/question/{questionId}"){
                    put(productController::addAnswer, Roles.USER)
                    }
                path("/search"){
                    get(productController::searchProducts, Roles.ANYONE)
                }
                path("/cart") {
                    get(cartController::getCart, Roles.USER)
                    put(cartController::updateCart, Roles.USER)
                }
                path("/cart/{id}"){
                    delete(cartController::removeProductCart, Roles.USER)
                }
                path("/purchase"){
                    post(cartController::purchase, Roles.USER)
                }
                path("/categories") {
                    get(categoryController::getAllCategories, Roles.ANYONE)
                }
                path("/categories/{id}") {
                    get(categoryController::getProductByCategory, Roles.ANYONE)
                }
            }
        }
        app.beforeMatched(tokenController::validate)
    }

    fun start() {
        app.start(7070)
    }
}

fun main() {
    Api().start()
}
