import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import { container } from '../infrastructure/container';
import { BooksRepository } from '../repositories/BooksRepository';
import { fileMulter } from '../middleware/file';

const bookRouter = Router();


interface AppInstance extends express.Express {}

bookRouter.get('/', async (req: Request, res: Response) => {
  const container: any = (req.app).get('container');
  const repo = container.get(BooksRepository);
  const books = await repo.getBooks();

  res.render("book/index", {
    title: "Список книг",
    books,
  });
});

bookRouter.get('/create', (req: Request, res: Response) => {
  res.render("book/create", {
    title: "Добавление книг на полку",
    book: {},
  });
});

bookRouter.post(
  '/create',
  fileMulter.single('fileBook'),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).render('book/create', {
        title: 'Добавление книг на полку',
        error: 'Файл книги не загружен',
        book: req.body
      });
    }

    const container: any = (req.app).get('container');
    const repo = container.get(BooksRepository);
    
    const newBook = {
      title: req.body.title,
      description: req.body.description,
      authors: req.body.authors,
      favorite: req.body.favorite === 'on' || req.body.favorite === 'true',
      fileCover: req.body.fileCover,
      fileName: req.file?.filename
    };

    await repo.createBook(newBook);

    res.redirect(`/book`);
  }
);

bookRouter.put('/:id', async (req: Request, res: Response) => {
  const container: any = (req.app).get('container');
  const repo = container.get(BooksRepository);

  const { id } = req.params;

  const index = repo.getBooks().findIndex((book: any) => book.id === id);

  if (index === -1) {
    return res.redirect('/404');
  }

  const updatedBook = {
    ...repo.getBooks()[index],
    title: req.body.title || '',
    description: req.body.description || '',
    authors: req.body.authors || '',
    favorite: req.body.favorite === 'true',
    fileCover: req.body.fileCover
  };

  await repo.updateBook(id, updatedBook);

  if (req.file) {
    updatedBook.fileName = req.file.filename;
  }

  res.redirect(`/book/${id}`);
});

bookRouter.delete('/:id', async (req: Request, res: Response) => {
  const container: any = (req.app).get('container');
  const repo = container.get(BooksRepository);

    const { id } = req.params;

    const index = repo.getBooks().findIndex((book: any) => book.id === id);

    if (index === -1) {
      return res.redirect('/404');
    }

    await repo.deleteBook(id);

  res.redirect(`/book`);
});

export default bookRouter;
