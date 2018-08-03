import AWS from 'aws-sdk'
import {OptionsConfigItemOptions} from 'index'

export default async function getConfigAwsDynamo(
    options: OptionsConfigItemOptions
): Promise<{[key: string]: any}> {
    if (options.sync) {
        throw new Error('This type does not support sync')
    }
    const scanParams = {TableName: options.tableName}
    const awsConfig = {region: options.region}

    AWS.config.update(awsConfig)
    const dynamodb = new AWS.DynamoDB.DocumentClient()
    const result: AWS.DynamoDB.DocumentClient.ScanOutput = await new Promise((resolve, reject) => {
        dynamodb.scan(scanParams, (err, data) => {
            if (err) {
                return reject(err)
            }
            return resolve(data)
        })
    })
    const config = result.Items ? result.Items.reduce((a, b) => ({...a, [b.key]: b.value}), {}) : {}
    return config
}
