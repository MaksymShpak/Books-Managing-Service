'use strict';

const { bookDAO } = require('../dao');

/**
 * Creates new book
 * @param authorName
 * @param releaseDate
 * @returns {Object}
 */
const createBook = async ({ authorName, releaseDate }) => {
    try {
        return await bookDAO.create({ authorName, releaseDate });
    } catch (e) {
        throw new Error('Couldn\'t create the book item.')
    }
};

/**
 * Deletes book
 * @param bookUuid
 */
const deleteBook = async (bookUuid) => {
    try {
        await bookDAO.deleteItem(bookUuid);
    } catch (e) {
        throw new Error(`Couldn\'t delete the book item ${bookUuid}`);
    }
};

/**
 * Updates book
 * @param bookUuid
 * @param authorName
 * @param releaseDate
 * @returns {Object}
 */
const updateBook = async ({ bookUuid, author, releaseDate }) => {
    try {
        return await bookDAO.update({ bookUuid, author, releaseDate });
    } catch (e) {
        throw new Error(`Couldn\'t update the book item ${bookUuid}`);
    }
};

/**
 * Gets book by Uuid
 * @param bookUuid
 * @returns {Object}
 */
const getBook = async (bookUuid) => {
    try {
        const result = await bookDAO.getById(bookUuid);
        console.log('getBook', JSON.stringify(result.Item));
        return result.Item;
    } catch (e) {
        throw new Error(`Couldn\'t get the book item ${bookUuid}`);
    }
};

/**
 * Gets all books
 * @returns {Array}
 */
const getAllBooks = async () => {
    try {
        return await bookDAO.list();
    } catch (e) {
        throw new Error(`Couldn\'t list all the book items`);
    }
};

module.exports = {
    createBook,
    deleteBook,
    updateBook,
    getAllBooks,
    getBook,
};