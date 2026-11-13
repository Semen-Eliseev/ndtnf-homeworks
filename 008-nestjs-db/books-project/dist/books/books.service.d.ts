import { Book } from './interfaces/book.inteface.js';
export declare class BooksService {
    private readonly books;
    create(book: Book): void;
    findAll(): Book[];
}
