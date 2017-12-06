#!/usr/bin/env node

const filename = "input"
//const filename = "test"

//todo: refactor like SHIIIIT!!!!

const data = require("fs").readFileSync(`${ filename }.txt`, 'utf-8')
    .split(" ")
    .filter(x => x != "" && x != "\n")
    .map(string => Number(string))

const mem = [...data]
let counter = 0
const states = []

const aaa = (function()
{
while(true)
{
    const bankToRedistribute = mem.indexOf(Math.max(...mem))
    let blocksToRedistribute = mem[bankToRedistribute]
    mem[bankToRedistribute] = 0

    let index = bankToRedistribute + 1
    while(blocksToRedistribute)
    {
        index %= mem.length
        mem[index]++
        index++
        blocksToRedistribute--
    }

    counter++

    const serializedState = mem.toString()
    if (states.includes(serializedState))
        return states.indexOf(serializedState)
    else
        states.push(serializedState)
}
})()

console.log(counter)
console.log(counter - aaa - 1)
