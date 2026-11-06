interface Book {
    id: number;
    title: string;
    description: string;
    authors: string;
    favorite: boolean;
    fileCover: string;
    fileName: string;
}


abstract class BooksRepository {
  abstract createBook(book: Book): void;
  abstract getBook(id: number): Book | null;
  abstract getBooks(): Book[];
  abstract updateBook(id: number, updatedBook: Book): void;
  abstract deleteBook(id: number): void;
}

class InMemoryBooksRepository extends BooksRepository {
  private books: Book[] = [];

  createBook(book: Book): void {
    this.books.push(book);
  };
  
  getBook(id: number): Book | null {
    return this.books.find((book) => book.id === id) ?? null;
  };
  
  getBooks(): Book[] {
    return [...this.books];
  };

   updateBook(id: number, updatedBook: Book): void {
    const index = this.books.findIndex((book) => book.id === id);

    if (index !== -1) {
      this.books[index] = updatedBook;
    }
  }

  deleteBook(id: number): void {
    const index = this.books.findIndex((book) => book.id === id);

    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

}
