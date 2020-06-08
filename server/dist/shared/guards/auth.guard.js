"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let AuthGuard = class AuthGuard {
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = context.switchToHttp().getRequest();
            if (request) {
                if (!request.headers.authorization) {
                    return false;
                }
                request.user = yield this.validateToken(request.headers.authorization);
                return true;
            }
        });
    }
    validateToken(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            if (auth.split(' ')[0] !== 'Bearer') {
                throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
            }
            const token = auth.split(' ')[1];
            try {
                const decoded = yield jwt.verify(token, process.env.SECRET);
                return decoded;
            }
            catch (err) {
                const message = 'Token error: ' + (err.message || err.name);
                throw new common_1.HttpException(message, common_1.HttpStatus.UNAUTHORIZED);
            }
        });
    }
};
AuthGuard = __decorate([
    common_1.Injectable()
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map