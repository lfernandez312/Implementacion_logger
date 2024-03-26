class NewPurchaseDto {
    constructor(newTicket) {
        this.code = newTicket.code;
        this.purchase_datetime = newTicket.purchase_datetime;
        this.amount = newTicket.amount;
        this.purchaser = newTicket.purchaser;
        this.products = newTicket.products ? newTicket.products.map(product => ({
            name: product.name,
            quantity: product.quantity,
            price: product.price,
            _id: product._id
        })) : [];
    }
}

module.exports = NewPurchaseDto;