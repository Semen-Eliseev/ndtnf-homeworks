import { Controller, Get } from '@nestjs/common';
import {BooksService} from './books.service.js';
import { Comix } from './data/comix.js';


@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    findAll() {
        const book = new Comix;
        this.booksService.create(book);
        return this.booksService.findAll();
    }
}