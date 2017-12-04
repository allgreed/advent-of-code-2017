#!/usr/bin/env node

const data = require("fs").readFileSync("../input.txt", 'utf-8')
    .split("\n")
    .slice(0, -1)
    .map(line => line.split(" "))

const isCollectionUnique = arr => new Set(arr).size === arr.length;
const result = data.map(line => isCollectionUnique(line)).reduce((a,b) => a+b);

console.log(result);

