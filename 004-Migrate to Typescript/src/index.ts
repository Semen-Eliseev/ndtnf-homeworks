import express from 'express';
import { render } from 'ejs';
import { container } from './infrastructure/container';
import { errorMiddleware } from './middleware/error';

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.set('view engine', 'ejs');
app.set('views', './views');
(app: any).set('container', container); 


app.use('/', indexRouter);
app.use('/book', bookRouter);


app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
