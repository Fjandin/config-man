const unflatten = require('flat').unflatten;
const path = require('path');
const fs = require('fs');

const configTypes = {
    default: require('./lib/config/default'),
    env: require('./lib/config/env'),
    json: require('./lib/config/json'),
    arg: require('./lib/config/arg'),
    awsDynamodb: require('./lib/config/aws-dynamodb')
};

const data = {
    config: {},
    initialized: false,
    promise: {}
};

module.exports.ready = new Promise((resolve, reject) => {
    data.promise.resolve = resolve;
    data.promise.reject = reject;
});

module.exports.get = function get(key) {
    if (!data.initialized) {
        throw new Error('ConfigMan: Not initialized');
    }
    const value = key.split('.').reduce((a, b) => typeof a === 'object' ? a[b] : undefined, data.config);

    if (value === undefined) {
        throw new Error(`ConfigMan: (${key}) not found`);
    }
    return JSON.parse(JSON.stringify(value));
};

module.exports.init = async function init(o = {}) {
    try {
        if (data.initialized) {
            throw new Error('ConfigMan: Already initialised');
        } else if (!fs.existsSync(path.join(o.cwd || __dirname, 'config-man.json'))) {
            throw new Error('CONFIG-MAN: You need to add a config-man.json file to your project root.');
        }

        const options = {
            cwd: __dirname,
            allowUnknown: !!o.allowUnknown,
            removeUnknown: !!o.removeUnknown,
            configs: [...o.configs || []],
            schema: require(path.join(o.cwd || __dirname, 'config-man.json')).schema
        };

        let errors = [];
        let config = {};
        const checkErrors = (dataItem, dataConfig) => (a, key) => {
            if (!options.schema.find((option) => option.key === key)) {
                if (options.removeUnknown) {
                    delete config[key];
                } else if (!options.allowUnknown) {
                    return [...a, `(${key}) of type <${typeof dataConfig[key]}> from (${dataItem.type}) is unknown`];
                }
            }
            return a;
        };
        for (let configItem of options.configs) {
            const newConfig = await configTypes[configItem.type]({...configItem, schema: options.schema, cwd: options.cwd});
            errors = Object.keys(newConfig).reduce(checkErrors(configItem, newConfig), errors);
            config = {
                ...config,
                ...newConfig
            };
        }

        errors = options.schema.reduce((a, option) => {
            const value = config[option.key];
            const type = typeof value;
            if (!option.nullable && value === null) {
                return [...a, `(${option.key}) is not nullable`];
            } else if (type !== option.type) {
                return [...a, `(${option.key}) invalid type. Expected <${option.type}> got <${type}>`];
            } else if (option.allowed && !option.allowed.includes(value)) {
                return [...a, `(${option.key}) value not allowed. Expected one of [${option.allowed.join(', ')}] got ${value}`];
            }
            return a;
        }, errors);

        if (errors.length) {
            throw new Error(`ConfigMan: invalid config\n${errors.join('\n')}`);
        }

        data.config = unflatten(config);
        data.initialized = true;
        data.promise.resolve(true);
    } catch (error) {
        data.promise.reject(error);
    }
};

