"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStoreDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_store_dto_1 = require("./create-store.dto");
class UpdateStoreDto extends (0, mapped_types_1.PartialType)(create_store_dto_1.CreateStoreDto) {
}
exports.UpdateStoreDto = UpdateStoreDto;
//# sourceMappingURL=update-store.dto.js.map