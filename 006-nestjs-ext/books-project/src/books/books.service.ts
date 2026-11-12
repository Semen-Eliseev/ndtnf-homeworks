import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/book.inteface.js'

@Injectable()
export class BooksService {
  private readonly books: Book[] = [];

  create(book: Book) {
    this.books.push(book);
  }

  findAll(): Book[] {
    return this.books;
  }
}
