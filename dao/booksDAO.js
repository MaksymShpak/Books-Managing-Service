'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const uuid = require('uuid-random');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * Creates new book record in dynamoDB table
 * @param authorName
 * @param releaseDate
 * @returns {Object} new book object
 */
const create = async ({ authorName, releaseDate }) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid(),
            releaseDate: releaseDate.getTime(),
            authorName: authorName,
        },
    };

    return new Promise(
        (resolve, reject) => {
            dynamoDb.put(params,  (error) => {
                if (error) reject(error);
            });
            resolve(params.Item);
        }
    )
};

/**
 * Deletes book record from dynamoDB table
 * @param bookUuid
 * @returns {Promise}
 */
const deleteItem = async (bookUuid) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: bookUuid,
        },
    };

    return new Promise(
        (resolve, reject) => {
            dynamoDb.delete(params,  (error) => {
                if (error) reject(error);
                resolve();
            });
        }
    )
};

/**
 * Updates book record in dynamoDB table by id
 * @param bookUuid
 * @param author
 * @param releaseDate
 * @returns {Object}
 */
const update = async ({ bookUuid, author, releaseDate }) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            'id': bookUuid,
        },
        ExpressionAttributeValues: {
            ':author': author,
            ':releaseDate': releaseDate.getTime(),
        },
        UpdateExpression: 'set authorName = :author, releaseDate = :releaseDate',
        ReturnValues: 'ALL_NEW',
    };

    return new Promise(
        (resolve, reject) => {
            dynamoDb.update(params,  (error, result) => {
                console.error(error);
                if (error) reject(error);
                resolve(result);
            });
        }
    )
};

/**
 * Gets book record in dynamoDB table by id
 * @param bookUuid
 * @returns {Object}
 */
const getById = async (bookUuid) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: bookUuid,
        },
    };

    return new Promise(
        (resolve, reject) => {
            dynamoDb.get(params,  (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        }
    )
};

/**
 * Gets all book records in dynamoDB table
 * @returns {Array}
 */
const list = async () => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
    };

    return new Promise(
        (resolve, reject) => {
            dynamoDb.scan(params,  (error, result) => {
                if (error) reject(error);
                resolve(result.Items);
            });
        }
    )
};

module.exports = {
    create,
    deleteItem,
    update,
    getById,
    list,
};