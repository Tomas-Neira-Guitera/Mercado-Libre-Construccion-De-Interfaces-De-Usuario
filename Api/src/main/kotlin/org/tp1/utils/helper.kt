package org.tp1.utils

import io.javalin.http.Context
import io.javalin.http.UnauthorizedResponse
import model.User

fun getAuthUser(ctx: Context): User {
    return ctx.attribute<User>("user") ?: throw UnauthorizedResponse("Invalid argument")
}
