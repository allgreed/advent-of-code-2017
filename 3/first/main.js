#!/usr/bin/env node
const { ceil, sqrt, abs } = Math;

const n = 265149;

const ringCoefficient = (x => x % 2 == 0 ? x+1 : x)(ceil(sqrt(n)));
const ring = (ringCoefficient - 1) / 2;
const maxElementForRing = ringCoefficient ** 2;

const boundry = (n =>
{
    const boundries =
    [
        {
            upper: maxElementForRing,
            lower: maxElementForRing - ringCoefficient + 1,
        },
        {
            upper: maxElementForRing - ringCoefficient,
            lower: maxElementForRing - 2 * ringCoefficient + 3,
        },

        {
            upper: maxElementForRing - 2 * ringCoefficient + 2,
            lower: maxElementForRing - 3 * ringCoefficient + 3,
        },

        {
            upper: maxElementForRing - 3 * ringCoefficient + 2, 
            lower: maxElementForRing - 4 * ringCoefficient + 5,
        },
    ];

    const isWithinBoundry = x => boundry => x >= boundry.lower && x <= boundry.upper; 

    return boundries.find(isWithinBoundry(n));
})(n); 

const middle = (boundry.upper + boundry.lower) / 2;
const correctionCoefficient = abs(middle - n);

const distance = ring + correctionCoefficient;
console.log(distance);

