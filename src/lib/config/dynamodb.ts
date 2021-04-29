import * as AWS from 'aws-sdk'

import {OptionsConfigItemOptions} from './../../index'

export default function getConfigAwsDynamo(
    options: OptionsConfigItemOptions,
): Promise<{[key: string]: any}> {
    if (options.sync) {
        throw new Error('This type does not support sync')
    }
    const scanParams = {TableName: options.tableName, ConsistentRead: true}
    const awsConfig = {region: options.region}

    AWS.config.update(awsConfig)
    const dynamodb = new AWS.DynamoDB.DocumentClient()
    const resultPromise: Promise<AWS.DynamoDB.DocumentClient.ScanOutput> = new Promise(
        (resolve, reject) => {
            dynamodb.scan(scanParams, (err, data) => {
                if (err) {
                    return reject(err)
                }
                return resolve(data)
            })
        },
    )

    return resultPromise.then((result) => {
        const config = result.Items
            ? result.Items.reduce((a, b) => ({...a, [b.key]: b.value}), {})
            : {}
        return config
    })
}
