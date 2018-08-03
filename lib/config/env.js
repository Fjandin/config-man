const parseValue = require('./../helpers').parseValue;

module.exports = function getConfigEnv(o) {
    const schema = o.schema;
    const prefix = o.prefix || 'CM_';
    const seperator = o.seperator || '_';
    const result = schema.reduce((a, option) => {
        const key = `${prefix}${option.key.replace(/\./g, seperator)}`;
        if (process.env[key] !== undefined) {
            return {...a, [option.key]: parseValue(option, process.env[key])};
        }
        return a;
    }, {});
    return o.sync
        ? result
        : Promise.resolve(result);
};
