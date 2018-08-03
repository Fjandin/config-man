const parseValue = require('./../helpers').parseValue;

module.exports = function getConfigArg(o) {
    const schema = o.schema;
    const result = schema.reduce((a, option) => {
        const index = process.argv.findIndex((b) => b.substr(0, option.key.length + 1) === `-${option.key}`);
        if (index > -1) {
            const value = process.argv[index].length === option.key.length + 1
                ? process.argv[index + 1]
                : process.argv[index].split('=')[1];
            return {
                ...a,
                [option.key]: parseValue(option, value)
            };
        }
        return a;
    }, {});
    return o.sync ? result : Promise.resolve(result);
};

