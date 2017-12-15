#!/usr/bin/env node

const filename = "input"
const data = require("fs").readFileSync(`${ filename }.txt`, 'utf-8')
    .split('\n')
    .slice(0, -1)
    .map(line => line.split(" "))
    .map(line => line[4])
    .map(string => Number(string))

const simulateGeneratorConfig =
{
    a: 
        {
            initialValue: data[0],
            factor: 16807,
        },
    b:
        {
            initialValue: data[1],
            factor: 48271,
        },
}

const counts =
{
    first: 40 * 10 ** 6,
    second: 5 * 10 ** 6,
}

const multiplicators =
{
    a: 4,
    b: 8,
}

function createGeneratorTemplate(config)
{
    return function* simulateGenerator(required_multiplicator)
    {
        let product = config.initialValue

        while(true)
        {
            product = (product * config.factor) % 2147483647

            if (product % required_multiplicator == 0)
                yield product
        }
    }
}

const genATemplate = createGeneratorTemplate(simulateGeneratorConfig.a)
const genBTemplate = createGeneratorTemplate(simulateGeneratorConfig.b)

function runSimulation(trials, multiplicators)
{
    genA = genATemplate(multiplicators.a)
    genB = genBTemplate(multiplicators.b)

    const result = [...Array(trials)]
        .map(i => genA.next().value % 2 ** 16 == genB.next().value % 2 ** 16)
        .reduce((a,b) => a + b, 0)

    console.log(result)
}

runSimulation(counts.first, {a: 1, b: 1})
runSimulation(counts.second, multiplicators)

