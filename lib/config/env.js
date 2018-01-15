const parseValue = require('./../helpers').parseValue;

module.exports = async function getConfigEnv(o) {
    const schema = o.schema;
    const prefix = o.prefix || 'CM_';
    const seperator = o.seperator || '_';
    return schema.reduce((a, option) => {
        const key = `${prefix}${option.key.replace(/\./g, seperator)}`;
        if (process.env[key] !== undefined) {
            return {...a, [option.key]: parseValue(option, process.env[key])};
        }
        return a;
    }, {});
};
