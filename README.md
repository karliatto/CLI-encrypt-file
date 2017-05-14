# A CLI with [nodeJS](https://nodejs.org/)


## Create a git repository and package.json file with npm

```bash
git init
```
```bash
npm init
```

## Install [commanderjs](https://github.com/tj/commander.js)

```bash
npm install commander --save 
```

Now we have the node_modules folder that we do not want to include in the git repository therefore we cretate the following file:
```bash
vim .gitignore
```

```javascript
var program = require('commander');

program
  .version('0.0.1')
  .description('secret is a CLI for encrypting files')
  .parse(process.argv)
```

```bash
node secret --help
node secret --version 

```