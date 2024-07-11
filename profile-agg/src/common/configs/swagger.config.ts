import { registerAs } from '@nestjs/config';

export default registerAs(
  'swagger',
  (): Record<string, any> => ({
    config: {
      info: {
        title: 'YouApp Profile Aggregation',
        setDescription: `Sistem manajemen Profile dirancang untuk memudahkan user dalam mengelola data profilnya. `,
        setVersion: '1.0',
        setTermsOfService: 'https://example.com/terms',
        setContact: `'John Doe', 'john@example.com', 'https://example.com/contact'`,
        setLicense: `'MIT', 'https://example.com/license'`,
        addTag: `'Endpoints', 'Kumpulan endpoint aplikasi'`,
      },
      swaggerUI: process.env.SWAGGER_ENABLED == 'true' ? true : false,
      documentationPath: '/profile/docs',
      documentationJson: '/profile/docs-json',
      swaggerPassword: process.env.SWAGGER_PASSWORD,
      swaggerUser: process.env.SWAGGER_USER,
    },
    options: {
      apisSorter: 'alpha',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    localUrl: process.env.SWAGGER_LOCAL_SERVER ?? 'http://localhost:3000',
    develompentUrl:
      process.env.SWAGGER_DEVELOPMENT_SERVER ?? 'https://example.com',
    productionUrl:
      process.env.SWAGGER_PRODUCTION_SERVER ?? 'https://example.com',
  }),
);
