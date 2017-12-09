#!/usr/bin/env node

const max = arr => arr.reduce((previous, current) => previous > current ? previous : current )

const filename = "input"
const data = require("fs").readFileSync(`${ filename }.txt`, 'utf-8')
    .split("\n")
    .slice(0, -1)
    .map(line => line.split(" ")) 

const registers = Array.from(new Set(data.map(_ => _[0]).concat(data.map(_ => _[4])))).reduce((accumulator, key) => ({ ...accumulator, [key]: 0}), {})

const instructions = data.map(tokens =>
    `if (registers['${tokens[4]}'] ${tokens[5]} ${tokens[6]})` `registers['${tokens[0]}'] ${tokens[1] === 'inc' ? '+' : '-'} = ${tokens[2]}`)

const maxPartials = instructions.map(instruction =>
{
    eval(instruction)
    return max(Object.values(registers))
})

const lastMax = maxPartials[maxPartials.length - 1]
const everMax = max(maxPartials)

console.log(lastMax)
console.log(everMax)

