module.exports = async function getConfigDefault(o) {
    const schema = o.schema;
    return schema.reduce((a, option) => {
        if (option.default !== undefined) {
            return {...a, [option.key]: option.default};
        }
        return a;
    }, {});
};
