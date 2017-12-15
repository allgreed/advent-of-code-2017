#!/usr/bin/env node

const filename = "input"
const data = require("fs").readFileSync(`../${ filename }.txt`, 'utf-8')
    .split('\n')
    .slice(0, -1)
    .map(line => line.split(" "))
    .map(line => line[4])
    .map(string => Number(string))

const initialValues =
{
    a: data[0],
    b: data[1],
}

const multiplicators =
{
    a: 4,
    b: 8,
}

const factors =
{
    a: 16807,
    b: 48271,
}

function* generator(initialValue, factor, required_multiplicator)
{
    let product = initialValue

    while(true)
    {
        product *= factor
        product %= 2147483647
        if (product % required_multiplicator == 0)
            yield product
    }
}

// for first part => multiplicator == 1
genA = generator(initialValues.a, factors.a, multiplicators.a)
genB = generator(initialValues.b, factors.b, multiplicators.b)

let counter = 0

// for (const i of Array(40 * 10 ** 6))
// {
//     const a = genA.next().value
//     const b = genB.next().value
//     if (a % 2 ** 16 === b % 2 ** 16)
//         counter++
// }

for (const i of Array(5 * 10 ** 6))
{
    const a = genA.next().value
    const b = genB.next().value
    if (a % 2 ** 16 === b % 2 ** 16)
        counter++
}
console.log(counter)
