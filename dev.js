const express = require("express");
const getDirname = require("../../dirname");
const clockApp = express()
const path = require('path')

clockApp.use(express.static(path.join(getDirname(),'public')))

const operators = {
    '-': (a, b) => a - b,
    '+': (a, b) => a + b
}

clockApp.get('/datetime', async (req, res) => {
    const tz = req.query.tz || 'GMT'
    const operator = tz.split('GMT')[0] || '+'
    const tzUtc = tz.split('GMT')[1]
    const hr = 60 * 60 * 1000 * (Number(tzUtc))
    const utc = new Date()
    const diff = Number(operators[operator](Number(utc), hr))
    const prsDate = new Date(diff)
    res.json(Number(prsDate))
})

module.exports = { clockApp }