export enum TypesNotification {
    NEW_ORDER = '1010',
    MESSAGE_CHAT = '3001',
    CHANGE_ORDER_STATUS = '5001'
}

export enum TypesRol {
    admin = 'admin',
    client = 'client',
    deliveryman = 'deliveryman',
    manager = 'manager'
}


export enum TypesPayment {
    cash = 5001,
    // Credit card
    money = 6002,
}