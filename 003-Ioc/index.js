const express = require('express');
const container = require('./container');
const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views', './views');
app.set('container', container); 

app.use('/', indexRouter);
app.use('/book', bookRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});