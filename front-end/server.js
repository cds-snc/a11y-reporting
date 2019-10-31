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

        server.set('port', (process.env.PORT || 3000));

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(server.get('port'), (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${server.get('port')}`)
        })
    })