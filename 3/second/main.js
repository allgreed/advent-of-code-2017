#!/usr/bin/env node

const axios = require('axios');
const n = 265149;

(async n => 
{
    const rawTable = await axios.get('https://oeis.org/A141481/b141481.txt').then(response => response.data);
    const numberTable = rawTable
        .split('\n')
        .slice(2)
        .map(pair => pair.split(" ")[1])
        .map(string => Number(string))
        
    const result = numberTable.find(x => x > n);
    console.log(result);
})(n)

