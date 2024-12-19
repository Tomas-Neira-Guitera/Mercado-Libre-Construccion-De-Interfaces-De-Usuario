package org.tp1.controller

import io.javalin.http.*
import model.DraftNewUser
import org.tp1.dto.UserDTO
import model.UserException
import org.tp1.body.LoginBody
import org.tp1.body.RegisterBody
import org.tp1.dto.SimpleUser
import org.tp1.utils.getAuthUser
import service.MercadoLibreService

class UserController(private val service: MercadoLibreService, private val tokenController: TokenController) {

    fun createUser(ctx: Context) {
        val emailRegex = Regex("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")
        val urlRegex = Regex("^(http|https)://[a-zA-Z0-9-_.]+\\.[a-zA-Z]{2,}(/.*)?$")

        val body = ctx.bodyValidator(RegisterBody::class.java)
            .check({ it.name.isNotEmpty() && it.name.isNotBlank() }, "name cannot be empty")
            .check({ it.email.isNotEmpty() && it.email.isNotBlank()  }, "email cannot be empty")
            .check({ emailRegex.matches(it.email) }, "email must be valid")
            .check({ it.password.isNotEmpty() && it.password.isNotBlank() }, "password cannot be empty")
            .check({ it.image.isNotEmpty() && it.image.isNotBlank() }, "image cannot be empty")
            .check({ urlRegex.matches(it.image) }, "image must be a valid URL")
            .getOrThrow {
                throw BadRequestResponse(
                    "Invalid registration or email already in use"
                )
            }

        try {
            val newUser = service.registerNewUser(DraftNewUser(body.name, body.email, body.password, body.image))
            val jwt = tokenController.userToToken(newUser)
            ctx.header(HEADER_AUTH, jwt)
            ctx.json(UserDTO(newUser))
        } catch (e : UserException) {
            throw BadRequestResponse("Email already in use")
        }
    }

    fun loginUser(ctx: Context) {

        val body = ctx.bodyValidator(LoginBody::class.java)
            .check({it.email.isNotEmpty() && it.email.isNotBlank()}, "email cannot be empty")
            .check({it.password.isNotEmpty() && it.password.isNotBlank()}, "password cannot be empty")
            .getOrThrow {
                throw BadRequestResponse("Invalid login credentials")
            }

        try {
            val user = service.getUser(body.email, body.password)
            val jwt = tokenController.userToToken(user)
            ctx.header(HEADER_AUTH, jwt)
            ctx.json(UserDTO(user))
        } catch (e: UserException){
            throw UnauthorizedResponse("Email or password incorrect")
        }
    }

    fun getUser(ctx: Context) {
        val user = getAuthUser(ctx)
        ctx.json(UserDTO(user))
    }

    fun getUserById(ctx: Context) {

        val userId = ctx.pathParam("id")

        if (userId.isBlank()) {
            throw BadRequestResponse("Invalid user id")
        }

        try {
        val user = service.getUser(userId)
        ctx.json(SimpleUser(user))
        } catch (e: UserException) {
            throw NotFoundResponse("User not found")
        }
    }
}