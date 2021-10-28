const ytdl = require('ytdl-core')
const express = require('express')

const app = express()
const config = require('./config.json')

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html')
})
app.get('/view/:id', (req, res) => {
    try {
        res.setHeader('Content-Type', 'audio/mpeg')
        ytdl(decodeURIComponent(req.params.id), {filter: 'audioonly'}).pipe(res)
    } catch(err) {
        console.error(err)
        res.send('fail')
    }
})

app.listen(config.port, () => {
    console.log('server opened at: ' + config.port)
})