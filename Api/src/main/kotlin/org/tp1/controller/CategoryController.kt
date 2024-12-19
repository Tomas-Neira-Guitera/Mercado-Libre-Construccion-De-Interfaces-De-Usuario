package org.tp1.controller

import io.javalin.http.BadRequestResponse
import io.javalin.http.NotFoundResponse
import io.javalin.http.Context
import model.Category
import model.CategoryException
import org.tp1.dto.PageDTO
import service.MercadoLibreService

class CategoryController(private val service: MercadoLibreService){

    fun getAllCategories(ctx : Context){
        val categories = service.getAllCategories()
        ctx.json(categories)
    }

    fun getProductByCategory(ctx: Context) {

        val categoryId = ctx.pathParam("id")

        if (categoryId.isBlank()) {
            throw NotFoundResponse("Category must be provided")
        }

        val pageNumber = ctx.queryParam("page")?.toIntOrNull() ?: 1

        if ( pageNumber< 1) {
            throw BadRequestResponse("Invalid page number")
        }

        val newPage = service.getProductsByCategory(categoryId, pageNumber)

        if (newPage.items.isEmpty()) {
            throw NotFoundResponse("Page not found")
        }
        ctx.json(PageDTO(newPage))
    }
}
