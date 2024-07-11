"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('transport', () => ({
    rabbitmq: {
        uri: process.env.RABBIT_MQ_URI || 'amqp://localhost:5672',
    },
}));
//# sourceMappingURL=rmq.config.js.map