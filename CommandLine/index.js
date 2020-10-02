#!/usr/bin/env node

"use strict";

var args = require('minimist');

// var argsOriginal = process.argv;
// console.log(argsOriginal);

// var modifiedArgs = args(process.argv.slice(2))

// console.log(modifiedArgs)

var modifiedArgswithOptions = args(process.argv.slice(2), {
    boolean: ["help"],
    string: ["name"]
})

console.log(modifiedArgswithOptions)




// ********************************
