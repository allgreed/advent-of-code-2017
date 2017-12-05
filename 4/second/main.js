#!/usr/bin/env node

const data = require("fs").readFileSync("../input.txt", 'utf-8')
    .split("\n")
    .slice(0, -1)
    .map(line => line.split(" "))

const isAnagram = require('anagram-checker')

const isLineValid = arr =>
{
    for (let comparedWord = arr.shift(); comparedWord !== undefined; comparedWord = arr.shift())
        if (!arr.every(element => !(isAnagram(element, comparedWord))))
            return false

    return true
}

const result = data.map(line => isLineValid(line)).reduce((a, b) => a + b)
console.log(result)

