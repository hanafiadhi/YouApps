"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('app', () => ({
    appEnv: process.env.APP_ENV || 'dev',
    host: process.env.APP_HOST || '0.0.0.0',
    port: {
        api: process.env.APP_PORT || 3000,
    },
    appName: process.env.APP_NAME || 'template-aggregation',
    apiPrefix: process.env.API_PREFIX || '/api/',
}));
//# sourceMappingURL=app.configuration.js.map