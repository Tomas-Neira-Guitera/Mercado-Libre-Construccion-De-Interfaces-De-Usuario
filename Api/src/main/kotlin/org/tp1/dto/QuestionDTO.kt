package org.tp1.dto

import model.Question

class QuestionDTO(question: Question) {
    val id = question.id
    val user = SimpleUser(question.user)
    val text = question.text
    val response = question.response
}