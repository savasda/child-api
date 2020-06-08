"use strict";
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
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
require("dotenv/config");
const common_1 = require("@nestjs/common");
const port = process.env.PORT || 4000;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.setGlobalPrefix('api');
        app.enableCors({
            origin: [
                'http://localhost:4200',
                'http://localhost:4300',
            ],
        });
        const usersOptions = new swagger_1.DocumentBuilder()
            .setTitle('Children API')
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Token' }, 'access-token')
            .build();
        const usersDocument = swagger_1.SwaggerModule.createDocument(app, usersOptions);
        swagger_1.SwaggerModule.setup('swagger', app, usersDocument);
        yield app.listen(port);
        common_1.Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map