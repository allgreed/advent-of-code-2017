#!/usr/bin/env node

const filename = "input"
const sum = require("fs").readFileSync(`../${ filename }.txt`, 'utf-8')
    .slice(0, -1)
    .replace(/\!./g, "") // removing bangs and one character after
    .replace(/<([^>]*)>/g, "") // gtfo garbage    
    .replace(/,/g, "") // removing colons as they mess the calculations
    .split("")
    .reduce((previous, current) =>
    ({
            depth: previous.depth + (current == '{' ? +1 : -1),
            sum: previous.sum + (current == '}' ? previous.depth : 0),
    }), {depth: 0, sum: 0}) 
    .sum
    
console.log(sum)

