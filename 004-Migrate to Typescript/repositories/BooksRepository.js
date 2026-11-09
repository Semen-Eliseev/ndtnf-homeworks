const { injectable } = require('inversify');

@injectable()
class BooksRepository {
  constructor() {
    this.books = [];
  }

  createBook(book) {
    this.books.push(book);
  }

  getBook(id) {
    return this.books.find((book) => book.id === id) ?? null;
  }

  getBooks() {
    return [...this.books];
  }

  updateBook(id, updatedBook) {
    const index = this.books.findIndex((book) => book.id === id);

    if (index !== -1) {
      this.books[index] = updatedBook;
    }
  }

  deleteBook(id) {
    const index = this.books.findIndex((book) => book.id === id);

    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }
}

class Book {
  constructor({
    id = null,
    title = '',
    description = '',
    authors = '',
    favorite = false,
    fileCover = '',
    fileName = '',
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
}

module.exports = { BooksRepository, Book };