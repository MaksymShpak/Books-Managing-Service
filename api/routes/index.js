'use strict';

const { Router } = require('express');

const booksRouter = require('./book');
const router = new Router();

router.use('/book', booksRouter);
router.use('/books', booksRouter);

module.exports = router;