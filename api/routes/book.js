'use strict';

const { Router } = require('express');

const {
    bookController
} = require('../controllers');

const router = new Router();

router
    .route('/books')
    .get(
        bookController.getAll,
    );

router
    .route('/book/:bookId')
    .get(
        bookController.getById,
    );

router
    .route('/book/add')
    .get(
        bookController.create,
    );

router
    .route('/book/:bookId/update')
    .get(
        bookController.update,
    );

router
    .route('/books/:bookId/delete')
    .get(
        bookController.delete,
    );

module.exports = router;