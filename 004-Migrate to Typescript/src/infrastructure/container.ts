import { Container } from 'inversify';
import { BooksRepository } from './repositories/BooksRepository';

export const container = new Container();

container.bind(BooksRepository).toSelf();
