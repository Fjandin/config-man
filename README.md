# NodeJS Configuration Manager

## Install

`yarn add @fjandin/config-man`

## Initialize

Add `[ProjectRoot]/config-man.json` file

```json
{
    "schema": [{"key": "server.port", "type": "number", "default": 8080, "nullable": false}]
}
```

```ts
import * as configMan from '@fjandin/config-man'

configMan.init({
    cwd: __dirname,
    removeUnknown: true,
    configs: [
        {type: configMan.ConfigType.DEFAULT},
        {type: configMan.ConfigType.DYNAMODB, tableName: 'Configuration-Table', region: 'eu-west-1'},
        {type: configMan.ConfigType.JAVASCRIPT, filepath: path.resolve('config.js')},
        {type: configMan.ConfigType.JSON, filepath: path.resolve('config.json')},
        {type: configMan.ConfigType.ARG, prefix: 'CM_'},
        {type: configMan.ConfigType.ENV, prefix: 'CM_}
    ]
});

async function startApp() {
    // Wait for config to be ready
    await configMan.ready;

    const port = configMan.get('server.port');
    // etc...
}
```
