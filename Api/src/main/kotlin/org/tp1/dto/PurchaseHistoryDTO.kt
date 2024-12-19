package org.tp1.dto

import model.PurchaseHistory

class PurchaseHistoryDTO(purchaseHistory: PurchaseHistory) {
    var items = purchaseHistory.items.map { ItemDTO(it) }
    var payment = PaymentDTO(purchaseHistory.payment)
    var date = purchaseHistory.date
}
