const express = require('express');
const { Container } = require('inversify');
const router = express.Router();
const fileMulter = require('../middleware/file');

const { Book } = require('../repositories/BooksRepository');

router.get('/', async (req, res, next) => {
  const container = req.app.get('container');
  const repo = container.get(BooksRepository);
  const books = await repo.getBooks();

  res.render("book/index", {
    title: "Список книг",
    books,
  });
});

router.get('/create', (req, res, next) => {
  res.render("book/create", {
    title: "Добавление книг на полку",
    book: {},
  });
});

router.post(
  '/create',
  fileMulter.single('fileBook'),
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400).render('book/create', {
        title: 'Добавление книг на полку',
        error: 'Файл книги не загружен',
        book: req.body
      });
    }

    const container = req.app.get('container');
    const repo = container.get(BooksRepository);
    
    const newBook = new Book({
      title: req.body.title,
      description: req.body.description,
      authors: req.body.authors,
      favorite: req.body.favorite === 'on' || req.body.favorite === 'true',
      fileCover: req.body.fileCover,
      fileName: req.file.filename
    });

    await repo.createBook(newBook);

    return res.redirect('/book');
  }
);

router.get('/:id', async (req, res, next) => {
  const container = req.app.get('container');
  const repo = container.get(BooksRepository);
  
  const book = await repo.getBook(req.params.id);

  if (!book) {
    return res.redirect('/404');
  }

  res.render("book/view", {
    title: "Книга",
    book,
  });
});

router.get('/update/:id', async (req, res, next) => {
  const container = req.app.get('container');
  const repo = container.get(BooksRepository);
  
  const book = await repo.getBook(req.params.id);

  if (!book) {
    return res.redirect('/404');
  }

  res.render("book/update", {
    title: "Книга",
    book,
  });
});

router.post(
  '/update/:id',
  fileMulter.single('fileBook'),
  async (req, res, next) => {
    const container = req.app.get('container');
    const repo = container.get(BooksRepository);

    const { id } = req.params;

    const index = repo.getBooks().findIndex(book => book.id === id);

    if (index === -1) {
      return res.redirect('/404');
    }

    const updatedBook = new Book({
      ...repo.getBooks()[index],
      title: req.body.title || '',
      description: req.body.description || '',
      authors: req.body.authors || '',
      favorite: req.body.favorite === 'true',
      fileCover: req.body.fileCover || ''
    });

    await repo.updateBook(id, updatedBook);

    if (req.file) {
      updatedBook.fileName = req.file.filename;
    }

    res.redirect(`/book/${id}`);
  }
);

router.post('/delete/:id', async (req, res, next) => {
  const container = req.app.get('container');
  const repo = container.get(BooksRepository);

    const { id } = req.params;

    const index = repo.getBooks().findIndex(book => book.id === id);

    if (index === -1) {
      return res.redirect('/404');
    }

    await repo.deleteBook(id);

  res.redirect(`/book`);
});


module.exports = router;