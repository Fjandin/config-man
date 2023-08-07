import {DynamoDBClient, ScanCommand} from '@aws-sdk/client-dynamodb'

import {OptionsConfigItemOptions} from './../../index'

export default async function getConfigAwsDynamo(
    options: OptionsConfigItemOptions,
): Promise<{[key: string]: any}> {
    if (options.sync) {
        throw new Error('This type does not support sync')
    }
    const scanParams = {TableName: options.tableName, ConsistentRead: true}
    const awsConfig = {region: options.region}

    const dynamodb = new DynamoDBClient(awsConfig)
    const result = await dynamodb.send(new ScanCommand(scanParams))

    const config = result.Items ? result.Items.reduce((a, b) => ({...a, ...b}), {}) : {}
    return config
}
