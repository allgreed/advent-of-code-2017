#!/usr/bin/env node

const filename = "input"
const data = require("fs").readFileSync(`../${ filename }.txt`, 'utf-8')
    .split('\n')
    .slice(0, -1)
    .map(string => Number(string))

const jumpList = [...data]

const jump = index => index + jumpList[index]++
const isInRange = index => index >=0 && index < jumpList.length

let currentIndex = 0, step = 1

while(isInRange(currentIndex = jump(currentIndex)))
    step++

console.log(step)

