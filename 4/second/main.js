#!/usr/bin/env node

const data = require("fs").readFileSync("../input.txt", 'utf-8')
    .split("\n")
    .slice(0, -1)
    .map(line => line.split(" "))

const isAnagramOf = (firstWord, secondWord) =>
{
    // todo: refactor this like shit
    firstWord = firstWord.split("")
    secondWord = secondWord.split("")

    if (firstWord.length !== secondWord.length)
        return false

    const removeFrom = arr => value =>
    {
        if (arr.includes(value))
            arr.splice(arr.indexOf(value), 1)
    }

    const removeOnce = removeFrom(firstWord)

    for (char of secondWord)
        removeOnce(char)

    return firstWord.length === 0 

}

const isLineValid = arr =>
{
    for (const comparedWord = arr.shift(); comparedWord !== undefined; comparedWord = arr.shift())
        if (!arr.every(element => !(isAnagramOf(element, comparedWord))))
            return false

    return true
}

const result = data.map(line => isLineValid(line)).reduce((a, b) => a + b)
console.log(result)

