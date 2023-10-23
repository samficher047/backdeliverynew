"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../auth/decorators");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const chat_service_1 = require("./chat.service");
const create_chat_dto_1 = require("./dto/create-chat.dto");
const user_entity_1 = require("../auth/entities/user.entity");
const types_1 = require("../common/glob/types");
const mark_all_chat_dto_1 = require("./dto/mark-all-chat.dto");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    findByOrder(id, paginationDto) {
        return this.chatService.findByOrder(id, paginationDto);
    }
    send(createChatDto, user) {
        return this.chatService.send(user, createChatDto);
    }
    markAllRead(markAllChatDto, user) {
        return this.chatService.markAllRead(user, markAllChatDto);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Get)('order/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "findByOrder", null);
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Auth)(types_1.TypesRol.deliveryman, types_1.TypesRol.client),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chat_dto_1.CreateChatDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "send", null);
__decorate([
    (0, common_1.Patch)(),
    (0, decorators_1.Auth)(types_1.TypesRol.deliveryman, types_1.TypesRol.client),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mark_all_chat_dto_1.MarkAllChatDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "markAllRead", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map