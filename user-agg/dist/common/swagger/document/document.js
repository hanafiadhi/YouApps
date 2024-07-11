"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
class DocumentSwagger {
    constructor(configService) {
        this.configService = configService;
        this.title = configService.get('swagger.config.info.title');
        this.setDescription = configService.get('swagger.config.info.setDescription');
        this.title = configService.get('swagger.config.info.title');
        this.localUrl = configService.get('swagger.localUrl');
        this.develompentUrl = configService.get('swagger.develompentUrl');
        this.productionUrl = configService.get('swagger.productionUrl');
    }
    Builder() {
        return new swagger_1.DocumentBuilder()
            .setTitle(this.title)
            .setDescription(this.setDescription)
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token to access endpoint',
            in: 'header',
        }, 'jwt')
            .addServer(`${this.localUrl}`, 'Local Server')
            .addServer(`${this.develompentUrl}`, 'Development Server')
            .addServer(`${this.productionUrl}`, 'Production Server')
            .build();
    }
}
exports.DocumentSwagger = DocumentSwagger;
//# sourceMappingURL=document.js.map