#!/usr/bin/env node

const filename = "input"
const sum = require("fs").readFileSync(`../${ filename }.txt`, 'utf-8')
    .slice(0, -1) // trailing whitespace
    .replace(/\!./g, "") // removing bangs 
    .match(/<([^>]*)>/g).map(match => match.replace(/<([^>]*)>/g, '$1')) // extracting stuff between '<' and '>'
    .map(captureGroup => captureGroup.length) // counting characters
    .reduce((a,b) => a +b) // suming it all up

console.log(sum)

