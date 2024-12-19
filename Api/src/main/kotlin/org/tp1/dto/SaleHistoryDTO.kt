package org.tp1.dto

import model.SaleHistory

class SaleHistoryDTO(saleHistory: SaleHistory) {
    var product = SimpleProductDTO(saleHistory.product)
    var amount = saleHistory.amount
    var payment = PaymentDTO(saleHistory.payment)
    var date = saleHistory.date
    var user = SimpleUser(saleHistory.user)
}