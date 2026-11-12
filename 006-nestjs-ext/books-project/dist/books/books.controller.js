var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { Comix } from './data/comix.js';
let BooksController = class BooksController {
    booksService;
    constructor(booksService) {
        this.booksService = booksService;
    }
    findAll() {
        const book = new Comix;
        this.booksService.create(book);
        return this.booksService.findAll();
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "findAll", null);
BooksController = __decorate([
    Controller('books'),
    __metadata("design:paramtypes", [BooksService])
], BooksController);
export { BooksController };
//# sourceMappingURL=books.controller.js.map