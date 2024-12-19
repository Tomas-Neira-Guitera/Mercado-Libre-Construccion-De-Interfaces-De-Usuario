package org.tp1.dto

import model.User

class   SimpleUser (user: User) {
    val id = user.id
    val name = user.name
    val email = user.email
    val image = user.image
}