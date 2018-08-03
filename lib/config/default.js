module.exports = function getConfigDefault(o) {
    const schema = o.schema;
    const result = schema.reduce((a, option) => {
        if (option.default !== undefined) {
            return {...a, [option.key]: option.default};
        }
        return a;
    }, {});
    return o.sync
        ? result
        : Promise.resolve(result);
};
