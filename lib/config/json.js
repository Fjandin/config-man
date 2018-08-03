const path = require('path');
const fs = require('fs');
const flatten = require('flat');

module.exports = function getConfigJson(o) {
    const cwd = o.cwd;
    const filePath = o.path || 'config.json';
    let content = fs.readFileSync(path.join(cwd, filePath), 'utf8');
    const result = flatten(JSON.parse(content));
    return o.sync
        ? result
        : Promise.resolve(result);
};
