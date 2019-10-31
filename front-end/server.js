const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'

console.log('Env:', process.env.NODE_ENV);

const app = next({
    dir: '.',
    dev
 })

const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        const port = process.env.PORT || 3000;

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })