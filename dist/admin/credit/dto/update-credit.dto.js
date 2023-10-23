"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCreditDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_credit_dto_1 = require("./create-credit.dto");
class UpdateCreditDto extends (0, mapped_types_1.PartialType)(create_credit_dto_1.CreateCreditDto) {
}
exports.UpdateCreditDto = UpdateCreditDto;
//# sourceMappingURL=update-credit.dto.js.map