const path = require('path');
const fs = require('fs');
const flatten = require('flat');

module.exports = async function getConfigJson(o) {
    const cwd = o.cwd;
    const filePath = o.path || 'config.json';
    const content = await new Promise((resolve, reject) => {
        fs.readFile(path.join(cwd, filePath), 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
    return flatten(JSON.parse(content));
};
