"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ErrorCode[ErrorCode["ACCOUNTNOTEXIST"] = 402] = "ACCOUNTNOTEXIST";
    ErrorCode[ErrorCode["NONE"] = 0] = "NONE";
    ErrorCode[ErrorCode["UNKNOWN"] = 100] = "UNKNOWN";
    ErrorCode[ErrorCode["EMAILUNIQUE"] = 101] = "EMAILUNIQUE";
    ErrorCode[ErrorCode["PHONEUNIQUE"] = 102] = "PHONEUNIQUE";
    ErrorCode[ErrorCode["NAMEUNIQUE"] = 103] = "NAMEUNIQUE";
    ErrorCode[ErrorCode["NOTBALANCE"] = 501] = "NOTBALANCE";
    ErrorCode[ErrorCode["INSUFFICIENTBALANCE"] = 502] = "INSUFFICIENTBALANCE";
    ErrorCode[ErrorCode["ORDERFULFILLED"] = 503] = "ORDERFULFILLED";
    ErrorCode[ErrorCode["FAILEDPAYMENT"] = 3003] = "FAILEDPAYMENT";
    ErrorCode[ErrorCode["DELIVERYMANNOTFOUND"] = 4001] = "DELIVERYMANNOTFOUND";
    ErrorCode[ErrorCode["DELIVERYMANCANNOTBEMANAGER"] = 4002] = "DELIVERYMANCANNOTBEMANAGER";
    ErrorCode[ErrorCode["MANAGERCANNOTBEDELIVERYMAN"] = 4002] = "MANAGERCANNOTBEDELIVERYMAN";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
//# sourceMappingURL=error.js.map