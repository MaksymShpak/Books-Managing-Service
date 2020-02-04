# Serverless REST API - Books Managing Service

This service allows to setup a RESTful Web Services allowing you to create, list, get, update and delete Books records. DynamoDB is used to store the data.

## Use-cases

- API for a Web Application
- API for a Mobile Application

## Setup

```bash
npm install
```

## Deploy

In order to deploy the endpoint simply run

```bash
serverless deploy
```

The expected result should be similar to:

```bash
Serverless: Packaging service…
Serverless: Uploading CloudFormation file to S3…
Serverless: Uploading service .zip file to S3…
Serverless: Updating Stack…
Serverless: Checking Stack update progress…
Serverless: Stack update finished…

Service Information
service: serverless-rest-api-with-dynamodb
stage: dev
region: us-east-1
api keys:
  None
endpoints:
  POST - https://796gtaff7j.execute-api.us-east-1.amazonaws.com/dev/book/add
  GET - https://796gtaff7j.execute-api.us-east-1.amazonaws.com/dev/books
  GET - https://796gtaff7j.execute-api.us-east-1.amazonaws.com/dev/book/{bookUuid}
  POST - https://796gtaff7j.execute-api.us-east-1.amazonaws.com/dev/book/{bookUuid}/update
  POST - https://796gtaff7j.execute-api.us-east-1.amazonaws.com/dev/book/{bookUuid}/delete
functions:
  create: serverless-rest-api-with-dynamodb-dev-create
  list: serverless-rest-api-with-dynamodb-dev-list
  get: serverless-rest-api-with-dynamodb-dev-get
  update: serverless-rest-api-with-dynamodb-dev-update
  delete: serverless-rest-api-with-dynamodb-dev-delete

```

## Usage

You can create, retrieve, update, or delete books with the following commands:

### Create a Book

```bash
curl -X POST https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/book/add --data '{ "authorName": "Ivan Franko", "releaseDate": "01-01-1965" }'
```

Example Result:
```bash
{"id":"06727ca0-4755-11ea-8468-8d85f6c3aebb","authorName":"Ivan Franko",releaseDate":1479138570824}%
```

### List all Books

```bash
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/books
```

Example output:
```bash
[{"id":"06727ca0-4755-11ea-8468-8d85f6c3aebb","authorName":"Ivan Franko",releaseDate":1479138570824},{"id":"06727ca0-4755-11ea-8468-8d85f6c3aebb","authorName":"Taras Shevchenko",releaseDate":1479138570824}]%
```

### Get one Book

```bash
# Replace the <bookUuid> part with a real id from your books table
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/book/<bookUuid>
```

Example Result:
```bash
{"id":"06727ca0-4755-11ea-8468-8d85f6c3aebb","authorName":"Ivan Franko",releaseDate":1479138570824}%
```

### Update a Book

```bash
# Replace the <bookUuid> part with a real id from your todos table
curl -X PUT https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/book/<bookUuid>/update --data '{ "authorNmae": "Learn Serverless", "releaseDate": "09-08-1234" }'
```

Example Result:
```bash
{"auhorName":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","releaseDate":1479138570824}%
```

### Delete a Book

```bash
# Replace the <bookUuid> part with a real id from your todos table
curl -X DELETE https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/book/<bookUuid>/delete
```

No output