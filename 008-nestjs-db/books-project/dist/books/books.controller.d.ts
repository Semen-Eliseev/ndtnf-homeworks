import { BooksService } from './books.service.js';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    findAll(): import("./interfaces/book.inteface.js").Book[];
}
