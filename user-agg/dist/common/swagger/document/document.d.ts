import { ConfigService } from '@nestjs/config';
interface IDocumentSwagger {
    title: string;
    setDescription: string;
    setVersion?: string;
    setTermsOfService?: string;
    setContact?: string;
    setLicense?: string;
    addBearerAuth: any;
    addApiKey?: any;
    addBasicAuth?: any;
    addOAuth2?: any;
    addTag?: any;
    localUrl: string;
    develompentUrl: string;
    productionUrl: string;
}
export declare class DocumentSwagger implements IDocumentSwagger {
    private readonly configService;
    readonly title: string;
    readonly setDescription: string;
    readonly setVersion?: string;
    readonly setTermsOfService?: string;
    readonly setContact?: string;
    readonly setLicense?: string;
    readonly addBearerAuth: any;
    readonly addApiKey?: any;
    readonly addBasicAuth?: any;
    readonly addOAuth2?: any;
    readonly addTag?: any;
    readonly localUrl: string;
    readonly develompentUrl: string;
    readonly productionUrl: string;
    constructor(configService: ConfigService);
    Builder(): Omit<import("@nestjs/swagger").OpenAPIObject, "paths">;
}
export {};
