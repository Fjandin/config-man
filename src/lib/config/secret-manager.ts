import {SecretsManagerClient, GetSecretValueCommand} from '@aws-sdk/client-secrets-manager'

import {parseValue} from './../helpers'

import {OptionsConfigItemOptions} from './../../index'

export default async function getConfigAwsDynamo(
    options: OptionsConfigItemOptions,
): Promise<{[key: string]: any}> {
    if (options.sync) {
        throw new Error('This type does not support sync')
    }

    const schema = options.schema
    const params = {SecretId: options.secretName}
    const awsConfig = {region: options.region}

    const client = new SecretsManagerClient(awsConfig)

    const secretValue = await client.send(new GetSecretValueCommand(params))

    let secret: string | undefined
    if ('SecretString' in secretValue) {
        secret = secretValue.SecretString
    } else {
        const buffer = secretValue.SecretBinary
            ? Buffer.from(secretValue.SecretBinary?.toString(), 'base64')
            : undefined
        secret = buffer?.toString('ascii')
    }
    if (!secret) {
        throw new Error('No secrets returned')
    }
    const secretObj = JSON.parse(secret)
    const result = schema.reduce((a: {[key: string]: any}, schemaItem) => {
        if (secretObj[schemaItem.key]) {
            return {
                ...a,
                [schemaItem.key]: parseValue(schemaItem, secretObj[schemaItem.key]),
            }
        }
        return a
    }, secretObj)
    return result
}
