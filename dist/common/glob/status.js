"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusPayment = exports.StatusOrder = void 0;
var StatusOrder;
(function (StatusOrder) {
    StatusOrder[StatusOrder["STARTED"] = 1] = "STARTED";
    StatusOrder[StatusOrder["ASSIGNED"] = 100] = "ASSIGNED";
    StatusOrder[StatusOrder["TAKEN"] = 101] = "TAKEN";
    StatusOrder[StatusOrder["DELIVERED"] = 200] = "DELIVERED";
    StatusOrder[StatusOrder["QUALIFIED"] = 300] = "QUALIFIED";
    StatusOrder[StatusOrder["CANCELLED"] = 400] = "CANCELLED";
})(StatusOrder || (exports.StatusOrder = StatusOrder = {}));
var StatusPayment;
(function (StatusPayment) {
    StatusPayment[StatusPayment["STARTED"] = 1] = "STARTED";
    StatusPayment[StatusPayment["CONFIRMED"] = 100] = "CONFIRMED";
    StatusPayment[StatusPayment["CANCELLED"] = 400] = "CANCELLED";
})(StatusPayment || (exports.StatusPayment = StatusPayment = {}));
//# sourceMappingURL=status.js.map