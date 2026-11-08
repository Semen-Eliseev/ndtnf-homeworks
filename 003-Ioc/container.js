const { Container } = require('inversify');

const { BooksRepository, InMemoryBooksRepository } = require('./repositories/BooksRepository');

const container = new Container();

container.bind(BooksRepository).toSelf();

module.exports = container;