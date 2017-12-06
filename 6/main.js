#!/usr/bin/env node

const filename = "input"

const range = (end, start = 0) => [...Array(end).keys()].map(x => x + start)

const memory = require("fs").readFileSync(`${ filename }.txt`, 'utf-8')
    .split(" ")
    .filter(x => x != "" && x != "\n")
    .map(string => Number(string))

const history = []

while(!history.includes(memory.toString()))
{
    history.push(memory.toString())

    const bankToRedistribute = memory.indexOf(Math.max(...memory))
    const blocksToRedistribute = ([, memory[bankToRedistribute]] = [memory[bankToRedistribute], 0])[0]
    range(blocksToRedistribute, bankToRedistribute).forEach(index => memory[index = ++index % memory.length]++)
}

console.log(history.length)
console.log(history.length - history.indexOf(memory.toString()))

