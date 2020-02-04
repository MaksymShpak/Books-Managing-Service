'use strict';

const { bookService } = require('../services');

/**
 * Handler function for book creation
 */
const create = async (event, context, callback) => {
    const data = JSON.parse(event.body);
    const releaseDate = data.releaseDate ? new Date(data.releaseDate) : new Date();
    if (typeof data.authorName !== 'string') {
        console.error('Validation Failed');
        return callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t create the todo item.',
        });
    }

    try {
        const result = await bookService.createBook({authorName: data.authorName, releaseDate});
        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(result),
        };
        return callback(null, response);
    } catch (e) {
        return callback(null, {
            statusCode: 500,
            headers: { 'Content-Type': 'text/plain' },
            body: e.toString(),
        });
    }
};

/**
 * Handler function for book deletion
 */
const deleteItem = async (event, context, callback) => {
    const bookId = event.pathParameters.bookUuid;

    if (!bookId) {
        console.error('Missing Book Uuid');
        return callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Missing Book Uuid',
        });
    }
    try {
        await bookService.deleteBook(bookId);
        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify({}),
        };
        return callback(null, response);
    } catch (e) {
        return callback(null, {
            statusCode: 500,
            headers: { 'Content-Type': 'text/plain' },
            body: e.toString(),
        });
    }
};

/**
 * Handler function to get book by Uuid
 */
const getById = async (event, context, callback) => {
    const bookId = event.pathParameters.bookUuid;
    if (!bookId) {
        console.error('Missing Book Uuid');
        return callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Missing Book Uuid',
        });
    }

    try {
        const item = await bookService.getBook(bookId);
        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(item),
        };
        return callback(null, response);
    } catch (e) {
        return callback(null, {
            statusCode: 500,
            headers: { 'Content-Type': 'text/plain' },
            body: e.toString(),
        });
    }
};

/**
 * Handler function to list all books
 */
const list = async (event, context, callback) => {
    try {
        const items = await bookService.getAllBooks();
        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(items),
        };
        callback(null, response);
    } catch (e) {
        return callback(null, {
            statusCode: 500,
            headers: { 'Content-Type': 'text/plain' },
            body: e.toString(),
        });
    }
};

/**
 * Handler function for book update
 */
const update = async (event, context, callback) => {
    const bookUuid = event.pathParameters.bookUuid;
    const data = JSON.parse(event.body);
    const releaseDate = data.releaseDate ? new Date(data.releaseDate) : new Date();

    // validation
    if (typeof data.authorName !== 'string') {
        console.error('Validation Failed');
        return callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t update the book item.',
        });
    }

    try {
        const { Attributes } = await bookService.updateBook({ bookUuid, author: data.authorName, releaseDate });
        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(Attributes),
        };
        return callback(null, response);
    } catch (e) {
        return callback(null, {
            statusCode: 500,
            headers: { 'Content-Type': 'text/plain' },
            body: e.toString(),
        });
    }
};

module.exports = {
    create,
    getById,
    list,
    deleteItem,
    update
};