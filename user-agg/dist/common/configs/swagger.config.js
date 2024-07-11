"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('swagger', () => ({
    config: {
        info: {
            title: 'YouApp User Aggregation',
            setDescription: `Fitur ini memungkinkan aplikasi untuk menambahkan pengguna baru ke sistem. Data pengguna seperti nama, email, dan password akan diterima dan disimpan ke dalam database setelah melalui proses validasi dan hashing password untuk keamanan.        `,
            setVersion: '1.0',
            setTermsOfService: 'https://example.com/terms',
            setContact: `'John Doe', 'john@example.com', 'https://example.com/contact'`,
            setLicense: `'MIT', 'https://example.com/license'`,
            addTag: `'Endpoints', 'Kumpulan endpoint aplikasi'`,
        },
        swaggerUI: process.env.SWAGGER_ENABLED == 'true' ? true : false,
        documentationPath: '/user/docs',
        documentationJson: '/user/docs-json',
        swaggerPassword: process.env.SWAGGER_PASSWORD,
        swaggerUser: process.env.SWAGGER_USER,
    },
    options: {
        apisSorter: 'alpha',
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
    },
    localUrl: process.env.SWAGGER_LOCAL_SERVER ?? 'http://localhost:3000',
    develompentUrl: process.env.SWAGGER_DEVELOPMENT_SERVER ?? 'https://example.com',
    productionUrl: process.env.SWAGGER_PRODUCTION_SERVER ?? 'https://example.com',
}));
//# sourceMappingURL=swagger.config.js.map