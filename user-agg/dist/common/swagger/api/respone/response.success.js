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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = exports.DeletingData = void 0;
const swagger_1 = require("@nestjs/swagger");
class DeletingData {
}
exports.DeletingData = DeletingData;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Berisi description tentang success',
        example: 'Berhasil menghapus data',
        type: String,
    }),
    __metadata("design:type", String)
], DeletingData.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Berisi status code yang di dapatkan',
        example: 200,
        type: Number,
    }),
    __metadata("design:type", Number)
], DeletingData.prototype, "statuCode", void 0);
class paging {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Page',
        example: 1,
        type: Number,
    }),
    __metadata("design:type", Number)
], paging.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'seberapa banyak data yang inign di tampilkan',
        example: 100,
        type: Number,
    }),
    __metadata("design:type", Number)
], paging.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'seberapa banyak data yang di peroleh',
        example: 200,
        type: Number,
    }),
    __metadata("design:type", Number)
], paging.prototype, "totalItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'seberapa banyak page yang di peroleh dari perhitungan limit',
        example: 200,
        type: Number,
    }),
    __metadata("design:type", Number)
], paging.prototype, "totalPages", void 0);
class Pagination {
}
exports.Pagination = Pagination;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: paging,
    }),
    __metadata("design:type", paging)
], Pagination.prototype, "paging", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Berisi data dari pagination bila datanya biasanya array object jika tidak ada cuma array kosong',
        type: (Array),
    }),
    __metadata("design:type", Array)
], Pagination.prototype, "data", void 0);
//# sourceMappingURL=response.success.js.map