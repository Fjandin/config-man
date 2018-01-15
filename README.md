# NodeJS configuration manager

## Install
`yarn add @fjandin/config-man`

## Initialize

[ProjectRoot]/config-man.json
````json
{
    "schema": [
        {"key": "server.port", "type": "number", "default": 8080, "nullable": false}
    ]
}
````

````js
const configMan = require('@fjandin/config-man')
configMan.init({
    cwd: __dirname,
    removeUnknown: true,
    configs: [
        {type: 'default'},
        {type: 'awsDynamodb', tableName: 'Deimos-Configuration', region: 'eu-west-1'},
        {type: 'json', path: 'config.json'},
        {type: 'arg'},
        {type: 'env'}
    ]
});

async function startApp() {
    // Wait for config to be ready
    await configMan.ready;
    
    const port = configMan.get('server.port');
    // etc...
}
````
