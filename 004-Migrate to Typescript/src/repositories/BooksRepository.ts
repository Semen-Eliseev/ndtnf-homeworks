import { injectable } from 'inversify';

interface Book {
  id: string | null;
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  fileCover?: string; 
  fileName?: string; 
}

@injectable()
export class BooksRepository {
  private books: Book[] = [];

  constructor() {
   
  }

  createBook(book: Book): void {
    this.books.push(book);
  }

  getBook(id: string): Book | null {
    return this.books.find((book) => book.id === id) ?? null;
  }

  getBooks(): Book[] {
    return [...this.books];
  }

  updateBook(id: string, updatedBook: Book): void {
    const index = this.books.findIndex((book) => book.id === id);

    if (index !== -1) {
      this.books[index] = { ...updatedBook };
    }
  }

  deleteBook(id: string): void {
    const index = this.books.findIndex((book) => book.id === id);

    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }
}
