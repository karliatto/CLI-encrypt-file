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

## Using 'File System' and 'crypto' modules from [NODEJS](https://nodejs.org/api/)

- [fs.createReadStream](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options)

```javascript
var input = fs.createReadStream(file);
var output = fs.createWriteStream(file + '.enc');
```

- [create cipher](https://nodejs.org/api/crypto.html#crypto_crypto_createcipher_algorithm_password)
['pipe' event in nodejs](https://nodejs.org/api/stream.html#stream_event_pipe)

```javacript
// in case nodejs was built without crypto module throws an error
var crypto;
	try {
		crypto = require('crypto');
	} catch (err) {
		console.log('crypto support is disabled!');
	}

```

```javascript
var cipher = cipher = crypto.createCipher('aes-256-cbc', 'password');
input.pipe(cipher).pipe(output);

```
At this point we can test if it all is working
```bash
node secret read testfile.txt
```

We can see the file was encrypted but we do not see any output, to solve this we can use the 'on' event from nodejs

- ['on' event in nodejs](https://nodejs.org/api/events.html#events_emitter_on_eventname_listener)
```javascript
output.on('finish', function() {
	console.log('Encrypted file written to disk!');
	console.log('Filename: ' + file + '.enc');
});
```

## Improving user experience with [inquirer](https://github.com/sboudrias/Inquirer.js)

```bash
npm install inquirer --save
```

```javascript
var inquirer = require('inquirer');
var questions = [
		{
			type: 'password',
			name: 'key',
			message: 'Insert a password to encrypt the file: ' + file ,
			default: false
		}]
inquirer.prompt(questions).then(function (answers) {
	// callback goes here
})
```

## Improving the output with [chalk](https://github.com/chalk/chalk)

```bash
npm install chalk --save
```
```javascript
console.log(chalk.green('success'));
```

## Finally doing a bash command
[Shebang](https://en.wikipedia.org/wiki/Shebang_(Unix))
add #!/usr/bin/env node to the js script

```javascript
"bin": {
    "secret": "./secret.js"
  },
```

```bash
sudo npm install -g
```
