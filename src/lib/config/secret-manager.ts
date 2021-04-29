import * as AWS from 'aws-sdk'

import {OptionsConfigItemOptions} from './../../index'

export default function getConfigAwsDynamo(
    options: OptionsConfigItemOptions,
): Promise<{[key: string]: any}> {
    if (options.sync) {
        throw new Error('This type does not support sync')
    }

    const params = {SecretId: options.secretName}
    const awsConfig = {region: options.region}

    AWS.config.update(awsConfig)
    const client = new AWS.SecretsManager(awsConfig)

    return new Promise((resolve, reject) => {
        client.getSecretValue(params, (err, data) => {
            if (err) {
                return reject(err)
            }
            let secret: string | undefined
            if ('SecretString' in data) {
                secret = data.SecretString
            } else {
                const buffer = Buffer.from(data.SecretBinary as string, 'base64')
                secret = buffer.toString('ascii')
            }
            if (!secret) {
                return reject(new Error('No secrets returned'))
            }
            try {
                const secretObj = JSON.parse(secret)
                return resolve(secretObj)
            } catch (e) {
                return reject(e)
            }
        })
    })
}
