'use strict';
var program = require('commander');
var fs = require('fs');
var inquirer = require('inquirer');
// in case nodejs was built without crypto module throws an error
var crypto;
	try {
		crypto = require('crypto');
	} catch (err) {
		console.log('crypto support is disabled!');
	}

program
	.command('read a file <file>')
	.description('read a file')
	.action(function(file) {
		console.log(file)
		var questions = [
		{
			type: 'password',
			name: 'key',
			message: 'Insert a password to encrypt the file: ' + file ,
			default: false
		}]
		inquirer.prompt(questions).then(function (answers) {
			console.log(answers)
			var input = fs.createReadStream(file);
			var output = fs.createWriteStream(file + '.enc');
			var cipher = crypto.createCipher('aes-256-cbc', answers.key);
			input.pipe(cipher).pipe(output);
			output.on('finish', function() {
				console.log('Encrypted file written to disk!');
				console.log('Filename: ' + file + '.enc');
			});
		});
	})

program
  .version('0.0.1')
  .description('secret is a CLI for encrypting files')
  .parse(process.argv)