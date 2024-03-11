export class GetTicketDTO {
    constructor(amount, code, purchase_datetime, purchaser) {
        this.amount = amount;
        this.code = code;
        this.purchase_datetime = purchase_datetime;
        this.purchaser = purchaser;
    }
}