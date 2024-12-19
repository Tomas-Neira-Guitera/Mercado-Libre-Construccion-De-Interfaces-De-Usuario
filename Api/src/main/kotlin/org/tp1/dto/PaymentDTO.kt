package org.tp1.dto

import model.Payment

class PaymentDTO(payment: Payment) {
    var name = payment.name
    var cardNumber = payment.cardNumber
    var cvv = payment.cvv
    var expirationDate = payment.expirationDate
}