#!/usr/bin/env node

const keyCount = 16;

function* range(n)
{
    let i = 0;
    while(i < n)
    {
        yield i
        ++i
    }
}

let programmeLine = [...Array(keyCount).keys()].map(number => String.fromCharCode(97 + number))

const spin = n => { programmeLine = programmeLine.splice(-n, n).concat(programmeLine) }
const swap = (a,b) => { [programmeLine[a], programmeLine[b]] = [programmeLine[b], programmeLine[a]] }
const pairSwap = (a,b) => { swap(programmeLine.indexOf(a), programmeLine.indexOf(b)) }

const filename = "input"
const instructionList = require("fs").readFileSync(`${ filename }.txt`, 'utf-8')
    .slice(0, -1)
    .split(',')
    .map(order =>
    {
        if(order[0] == 's')
            fn = spin 
        else if (order[0] == 'x')
            fn = swap
        else
            fn = pairSwap
        
        const args =
        [
            order[2] == undefined || order[2] == '/' ? order[1] : order[1] + order[2],
            order.includes('/') ? order.slice(order.indexOf('/')+1) : undefined,
        ]
        .map(arg => isNaN(Number(arg)) ? arg : Number(arg))

        return { fn, args }
    })

const doTheDance = () =>
{
    instructionList.forEach(instruction => instruction.fn(instruction.args[0], instruction.args[1]))
    return programmeLine.join("")
}

const history = []

while(!history.slice(0, -1).includes(programmeLine.join("")))
    history.push(doTheDance())

const remainingIterations = 1e9 % history.length;

for (const i of range(remainingIterations + 1))
    doTheDance()

console.log(history[0])
console.log(programmeLine.join(""))

