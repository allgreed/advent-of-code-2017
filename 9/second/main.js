#!/usr/bin/env node

const filename = "input"
const data = require("fs").readFileSync(`../${ filename }.txt`, 'utf-8')
    .slice(0, -1)
    .split("")

//todo: refactor to reduce with passing state object between function calls
let sum = 0, skip_flag = false

for (let i = 0; i < data.length; ++i)
{
    character = data[i]
    
    if (character == '!')
        ++i
    else if (skip_flag && character != '>')
        ++sum 
    else if (character == '<')
        skip_flag = true
    else if (character == '>')
        skip_flag = false 
}

console.log(sum)

