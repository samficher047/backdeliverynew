"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesPayment = exports.TypesRol = exports.TypesNotification = void 0;
var TypesNotification;
(function (TypesNotification) {
    TypesNotification["NEW_ORDER"] = "1010";
    TypesNotification["MESSAGE_CHAT"] = "3001";
    TypesNotification["CHANGE_ORDER_STATUS"] = "5001";
})(TypesNotification || (exports.TypesNotification = TypesNotification = {}));
var TypesRol;
(function (TypesRol) {
    TypesRol["admin"] = "admin";
    TypesRol["client"] = "client";
    TypesRol["deliveryman"] = "deliveryman";
    TypesRol["manager"] = "manager";
})(TypesRol || (exports.TypesRol = TypesRol = {}));
var TypesPayment;
(function (TypesPayment) {
    TypesPayment[TypesPayment["cash"] = 5001] = "cash";
    TypesPayment[TypesPayment["money"] = 6002] = "money";
})(TypesPayment || (exports.TypesPayment = TypesPayment = {}));
//# sourceMappingURL=types.js.map