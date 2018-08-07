module.exports = {
    config: {
        update: () => null
    },
    DynamoDB: {
        DocumentClient
    }
}

function DocumentClient() {}

DocumentClient.prototype.scan = (params, callback) => {
    callback(null, {
        Items: [{key: 'test3', value: 2}, {key: 'db.unknown', value: 'dynamo'}]
    })
}
