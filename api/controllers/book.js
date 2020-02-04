'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const create = async (req, res, next) => {
    const data = JSON.parse(req.body);

    try {
        const params = {
            TableName: 'bookTable',
            Item: {
                id: uuid.v1(),
                releaseDate: data.releaseDate,
                author: data.author,
            },
        };

        const record = await dynamoDb.put(params);

        return res.status(200).json(record);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    create,
};