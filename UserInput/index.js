#! /usr/bin/env node

"use strict";

var path = require("path");
var fs = require("fs");
const Stream  = require('stream');

var getStdin = require("get-stdin");

var args = require('minimist')(process.argv.slice(2), {
    boolean: ["help","in"],
    string: ["file"]
})

const BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname)

if (args.help || process.argv.length <= 2) {
    error(null,/*showHelp=*/ true);
} 
//'-' is way to denote that stdin will provide input
else if(args._.includes("-") || args.in) {
    getStdin().then(processFile).catch(error);
}
else if(args.file) {
    let filePath = path.join(BASE_PATH,args.file);
    fs.readFile(filePath,function onContent(err,content) {
        if(err) {
            error(err.toString());
        }
        else processFile(content.toString());
    })
}

else {
    error('incorrect usage', true);
}

// ********************************

function printHelp() {
    console.log("");
	console.log("--help                      print this help");
	console.log("-, --in                     read file from stdin");
	console.log("--file={FILENAME}           read file from {FILENAME}");
	console.log("");
	console.log("");
}

function error(err, showHelp = false) {
    process.exitCode = 1;
    console.error(err);
    if(showHelp) {
        console.log("");
        printHelp();
    }

}

function processFile(content) {
    let text = content.toUpperCase();
    process.stdout.write(text);
}



