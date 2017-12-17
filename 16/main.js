#!/usr/bin/env node

const keyCount = 16;

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
        
        firstArg = order[2] == undefined || order[2] == '/' ? order[1] : order[1] + order[2] 
        secondArg = order.includes('/') ? order[order.indexOf('/') + 1] : undefined
        if(order[order.indexOf('/') + 2] && secondArg)
            secondArg += order[order.indexOf('/') + 2]  

        const args = [firstArg, secondArg].map(arg => isNaN(Number(arg)) ? arg : Number(arg))

        return { fn, args }
    })

const history = []

const doTheDance = () => instructionList.forEach(instruction => instruction.fn(instruction.args[0], instruction.args[1]))

doTheDance()
let currentLine = programmeLine

console.log(programmeLine.join(""))

let i = 1;
while(!history.includes(currentLine.join("")))
{

    history.push(currentLine.join(""))
    doTheDance()
    currentLine = programmeLine
    i++;
}

const remainingIterations = 1e9 % i;

function* range(n)
{
    let i = 0;
    while(i < n)
    {
        yield i
        ++i
    }
}

for (const i of range(remainingIterations + 1))
    doTheDance()

console.log(programmeLine.join(""))

