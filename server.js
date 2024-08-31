const express = require("express");
const app = express()
const port = process.env.PORT || 3001
app.use(express.static('./public'))

const operators = {
    '-': (a, b) => a - b,
    '+': (a, b) => a + b
}

app.get('/datetime', async (req, res) => {
    const tz = req.query.tz || 'GMT'
    const operator = tz.split('GMT')[0] || '+'
    const tzUtc = tz.split('GMT')[1]
    const hr = 60 * 60 * 1000 * (Number(tzUtc))
    const utc = new Date()
    const diff = Number(operators[operator](Number(utc), hr))
    const prsDate = new Date(diff)
    res.json(Number(prsDate))
})

app.listen(port, () => {
    console.log(`Server Runnin on port: ${port}`)

    setInterval(() => {
        setTimeout(() => {
            (async () => {
                try {
                    const _ = await fetch('https://sprintclock.onrender.com', {
                        method: 'GET',
                    })
                    console.log(`Ping: ${(new Date()).toString()}`)
                } catch (err) {
                    console.error(`PINGERROR: ${err}`)
                }
            })()
        }, [Math.floor(Math.random() * 1000 * 20)])
    }, 1000 * 60 * 10);
})