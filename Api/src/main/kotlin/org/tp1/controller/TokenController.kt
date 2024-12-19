package org.tp1.controller

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTCreator
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.exceptions.JWTDecodeException
import com.auth0.jwt.exceptions.JWTVerificationException
import com.auth0.jwt.exceptions.TokenExpiredException
import io.javalin.http.Context
import io.javalin.http.Handler
import io.javalin.http.NotFoundResponse
import io.javalin.http.UnauthorizedResponse
import io.javalin.security.RouteRole
import javalinjwt.JWTGenerator
import javalinjwt.JWTProvider
import service.MercadoLibreService
import model.User
import model.UserException
import org.tp1.Roles

val HEADER_AUTH = "Authorization"

class UserGenerator : JWTGenerator<User> {
    override fun generate(user: User, alg: Algorithm?): String {
        val token: JWTCreator.Builder = JWT.create()
            .withClaim("id", user.id)
        return token.sign(alg)
    }
}

class TokenController(private val service: MercadoLibreService) {

    private val algorithm = Algorithm.HMAC256("stringwithmorethan16chars")
    private val verifier = JWT.require(algorithm).build()
    private val generator = UserGenerator()
    private val provider = JWTProvider(algorithm, generator, verifier)

    fun userToToken(user: User): String {
        return provider.generateToken(user)
    }

    fun tokenToUser(token: String): User {
        try {
        val validateToken = provider.validateToken(token)
        val userId = validateToken.get().getClaim("id").asString()
        return service.getUser(userId)
        } catch (e: UserException) {
            throw NotFoundResponse("User not found")
        } catch (e: NoSuchElementException) {
            throw UnauthorizedResponse("Invalid token")
        }
    }

    fun validate(ctx: Context){
        val header = ctx.header(HEADER_AUTH)
        when {
            ctx.routeRoles().contains(Roles.ANYONE) ->  return
            header == null -> {
                throw  UnauthorizedResponse("No token provided")
            }
            else -> {
                val user = tokenToUser(header)
                ctx.attribute("user", user)
                return
            }
        }
    }
}