"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const basicAuth = require("express-basic-auth");
const common_1 = require("@nestjs/common");
const document_1 = require("./common/swagger/document/document");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        exceptionFactory: (errors) => {
            return new common_1.BadRequestException({
                statusCode: 400,
                error: 'Bad Request',
                message: errors.reduce((acc, e) => ({
                    ...acc,
                    [e.property]: Object.values(e.constraints),
                }), {}),
            });
        },
    }));
    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    const configService = app.get(config_1.ConfigService);
    const env = configService.get('app.appEnv');
    const appName = configService.get('app.appName');
    const swaggerConfig = configService.get('swagger.config');
    const swaggerPath = swaggerConfig.documentationPath;
    if (swaggerConfig.swaggerUI === true) {
        app.use([`${swaggerPath}`, `${swaggerConfig.documentationJson}`], basicAuth({
            challenge: true,
            users: {
                [`${swaggerConfig.swaggerUser}`]: swaggerConfig.swaggerPassword,
            },
        }));
        const document = swagger_1.SwaggerModule.createDocument(app, new document_1.DocumentSwagger(configService).Builder());
        const swaggerOptions = configService.get('plugin.swagger.options');
        swagger_1.SwaggerModule.setup(`${swaggerPath}`, app, document, {
            swaggerOptions: swaggerOptions,
        });
    }
    await app.listen(configService.get('app.port.api'), configService.get('app.host'));
    const appUrl = await app.getUrl();
    console.log(`\n`);
    console.log(`APP NAME\t: ${appName}`);
    console.log(`ENVIRONMENT\t: ${env}`);
    console.log(`RUNNING ON \t: ${appUrl}`);
    console.log(`SWAGGER UI\t: ${appUrl}${swaggerPath}`);
}
bootstrap();
//# sourceMappingURL=main.js.map