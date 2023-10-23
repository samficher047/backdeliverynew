export enum ErrorCode {

    UNAUTHORIZED = 401,
    ACCOUNTNOTEXIST = 402,

    NONE = 0,
    UNKNOWN = 100,

    EMAILUNIQUE = 101,
    PHONEUNIQUE = 102,
    NAMEUNIQUE = 103,

    NOTBALANCE = 501,
    INSUFFICIENTBALANCE = 502,
    ORDERFULFILLED = 503,

    FAILEDPAYMENT = 3003,

    DELIVERYMANNOTFOUND = 4001,
    //The deliveryman role cannot have the role of manager.
    DELIVERYMANCANNOTBEMANAGER = 4002,
    //The manager role cannot have the role of deliveryman.
    MANAGERCANNOTBEDELIVERYMAN = 4002,
}