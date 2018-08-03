module.exports.parseValue = function parseValue(option, value) {
    switch (option.type) {
        case 'number': return parseFloat(value) || value;
        case 'boolean': return toBoolean(value) || value;
    }
    if (value.toString().toLowerCase() === 'null') {
        return null;
    }
    return value;
};

function toBoolean(value) {
    switch (typeof value) {
        case 'number': return [1, 0].includes(value)
            ? !!value
            : value;
        case 'string': return ['true', 'false'].includes(value.toLowerCase())
            ? value === 'true'
            : value;
    }
    return value;
}

module.exports.realTypeOf = function realTypeOf(obj) {
    return ({}).toString.call(obj).replace(/\[object\s(.*?)\]/, '$1').toLowerCase();
};
