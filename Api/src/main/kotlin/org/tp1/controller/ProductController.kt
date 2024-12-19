package org.tp1.controller

import io.javalin.http.*
import model.*
import org.tp1.body.QuestionBody
import org.tp1.dto.*
import org.tp1.dto.PageDTO
import org.tp1.body.ProductBody
import org.tp1.dto.ProductDTO
import org.tp1.utils.getAuthUser
import service.MercadoLibreService

class ProductController(private val service: MercadoLibreService) {

    fun getRelatedProducts(ctx: Context) {


        val id = ctx.pathParam("id")


        if (id.isBlank()) {
            throw BadRequestResponse("Product id cannot be empty")
        }

        try{
            val products = service.getRelatedProducts(id)
            val productsDTO = products.map{p -> SimpleProductDTO(p) }
            ctx.json(productsDTO)
        } catch(e: ProductException){
            throw NotFoundResponse("Product not found")
        }
    }

    fun toggleLike(ctx: Context) {

        val productID  = ctx.pathParam("id")

        if (productID.isBlank()) {
            throw BadRequestResponse("Product id cannot be empty")
        }

        val user = getAuthUser(ctx)

        try {
            val newUser = service.toggleLike(user.id, productID)
            ctx.json(UserDTO(newUser))
        } catch (e: ProductException) {
            throw NotFoundResponse("Product not found")
        } catch(e: UserException){
            throw NotFoundResponse("User not found")
        }

    }

    fun addQuestion(ctx: Context) {

        val body = ctx.bodyValidator(QuestionBody::class.java)
            .check({ it.text.isNotBlank() }, "Question cannot be empty")
            .getOrThrow {
                    throw BadRequestResponse("Question cannot be empty")
            }


        val productID = ctx.pathParam("id")
        if (productID.isBlank()) {
            throw NotFoundResponse("Product id cannot be empty")
        }

        val user = getAuthUser(ctx)

        try {

            val newProduct = service.addQuestion(user.id,productID, body.text)
            ctx.json(ProductDTO(newProduct))

        } catch (e: ProductException) {
            throw NotFoundResponse("Product not found")
        } catch(e: UserException){
            throw NotFoundResponse("User not found")
        } catch (e: QuestionException) {
            throw NotFoundResponse("The user is the owner of the product")
        }
    }

    fun addAnswer(ctx: Context) {

        val body = ctx.bodyValidator(QuestionBody::class.java)
            .check({ it.text.isNotBlank() }, "Answer cannot be empty")
            .getOrThrow {
                throw BadRequestResponse("Answer cannot be empty")
            }

        val productID = ctx.pathParam("id")
        if (productID.isBlank()) {
            throw BadRequestResponse("Product id cannot be empty")
        }

        val questionID = ctx.pathParam("questionId")
        if (questionID.isBlank()) {
            throw BadRequestResponse("Question id cannot be empty")
        }

        val user = getAuthUser(ctx)


        try {
            val newProduct = service.addAnswer(user.id, productID, questionID, body.text)
            ctx.json(ProductDTO(newProduct))
        } catch (e: QuestionException){
            throw BadRequestResponse("The user is not the owner of the product or the product is not found")
        } catch (e: UserException){
            throw NotFoundResponse("User not found")
        } catch (e: ProductException){
            throw NotFoundResponse("Product not found")
        }
    }

    fun searchProducts(ctx: Context) {

        val tituloProducto = ctx.queryParam("query")
        if (tituloProducto.isNullOrBlank()) {
            throw BadRequestResponse("Title cannot be empty")
        }

        val pageNumber = ctx.queryParam("page")?.toIntOrNull() ?: 1

        if ( pageNumber< 1) {
            throw BadRequestResponse("Invalid page number")
        }

        val newPage = service.searchProducts(tituloProducto, pageNumber.toInt())
        if (newPage.items.isEmpty()) {
            throw NotFoundResponse("Page not found")
        }
        ctx.json(PageDTO(newPage))

    }

    fun getProductsByUser(ctx : Context) {
        val userId = ctx.pathParam("id")
        val pageNumber = ctx.queryParam("page")?.toIntOrNull() ?: 1



        if ( pageNumber< 1) {
            throw BadRequestResponse("Invalid page number")
        }

        if (userId.isBlank()) {
            throw BadRequestResponse("Invalid user id")
        }

        val products = service.getProductsByUser(userId, pageNumber)

        if (products.items.isEmpty()) {
            throw NotFoundResponse("User or page not found")
        }

        ctx.json(PageDTO(products))



    }

    fun getAllProducts(ctx: Context) {
        val pageNumber = ctx.queryParam("page")?.toIntOrNull() ?: 1

        if ( pageNumber < 1) {
            throw BadRequestResponse("Page must be greater than 0")
        }
            val page = service.getAllProducts(pageNumber)

            if (page.items.isEmpty()) {
                throw NotFoundResponse("Page not found")
            }
            ctx.json(PageDTO(page))




    }

    fun createProduct(ctx: Context) {
        val productBody= ctx.bodyValidator(ProductBody::class.java)
            .check({ it.title.isNotBlank() }, "name cannot be empty.")
            .check({ it.description.isNotBlank() }, "description cannot be empty.")
            .check({ it.price > 0 }, "price must be greater than 0.")
            .check({ it.images.isNotEmpty() }, "at least one image is required.")
            .check({ it.stock > 0 }, "stock must be greater than 0.")
            .check({ it.shipping.price > 0 }, "shipping cannot be free.")
            .check({ it.characteristics.isNotEmpty()}, "At least one characteristics is required.")
            .check({ it.categoryId.isNotBlank()}, "At least one category is required.")
            .getOrThrow {
                throw BadRequestResponse("Check Product information")
            }

        val user = getAuthUser(ctx)

        try {
            val cat =  service.getCategory(productBody.categoryId)
            val productDraft = DraftProduct(
                productBody.title,
                productBody.description,
                productBody.price,
                productBody.images,
                productBody.stock,
                productBody.shipping,
                productBody.characteristics,
                cat)

            val newProduct = service.addProduct(user.id, productDraft)
            ctx.json(ProductDTO(newProduct))

        }catch(e: CategoryException){
            throw NotFoundResponse("Category not found")
        }catch (e: UserException){
            throw NotFoundResponse("User not found")

        }


    }
    fun getProductById(ctx: Context) {
        val  pid = ctx.pathParam("id")

        if (pid.isBlank()) {
            throw throw NotFoundResponse("Product id cannot be empty")
        }
        try{
            val product = service.getProduct(pid)
            ctx.json(ProductDTO(product))
        }catch (e: ProductException){
            throw NotFoundResponse("Product not found")
        }

    }



    fun updateProduct(ctx : Context) {
        val userId = getAuthUser(ctx).id
        val productBodyToBeUpdated= ctx.bodyValidator(ProductBody::class.java)
            .check({ it.title.isNotBlank() }, "name cannot be empty.")
            .check({ it.description.isNotBlank() }, "description cannot be empty.")
            .check({ it.price > 0 }, "price must be greater than 0.")
            .check({ it.images.isNotEmpty() }, "at least one image is required.")
            .check({ it.stock > 0 }, "stock must be greater than 0.")
            .check({ it.shipping.price > 0 }, "shipping cannot be free.")
            .check({ it.characteristics.isNotEmpty()}, "At least one characteristics is required.")
            .check({ it.categoryId.isNotBlank()}, "At least one category is required.")
            .getOrThrow {
                throw BadRequestResponse("Check Product information")
            }

        val pid = ctx.pathParam("id")
        if (pid.isBlank()) {
            throw NotFoundResponse("Product id cannot be empty")
        }



        try {
            val cat =  service.getCategory(productBodyToBeUpdated.categoryId)
            val productDraft = DraftProduct(
                productBodyToBeUpdated.title,
                productBodyToBeUpdated.description,
                productBodyToBeUpdated.price,
                productBodyToBeUpdated.images,
                productBodyToBeUpdated.stock,
                productBodyToBeUpdated.shipping,
                productBodyToBeUpdated.characteristics,
                cat)

            val editedProduct = service.editProduct(userId,pid,productDraft)
            ctx.json(ProductDTO(editedProduct))
        }catch(e: UserException){
            throw NotFoundResponse("User not found")
        }catch(e: ProductException){
            throw NotFoundResponse("Product not found or product not found in users products")
        }catch(e: CategoryException){
            throw NotFoundResponse("Category not found")
        }


    }


}
