const express = require('express')
const app = express()

const fs = require('fs')
const PORT = process.env.PORT || 4545

app.get('/pets', function (req, res) {
    fs.readFile('pets.json', 'utf8', function (error, data) {
        if (error) {
            res.status(500).type('text').send('Internal Server Error')
        } else {
            res.type('json').send(data)
        }
    })
})

app.get('/pets/:id', function (req, res) {
    fs.readFile('pets.json', 'utf8', function(error, data) {
        let index = req.params.id
        let pet = JSON.parse(data)
        let numOfPets = pet.length - 1
        if (error) {
            res.status(500).type('text').send('Internal Server Error')
        } else if (index > numOfPets || index < 0 || typeof index !== "number") {
            res.status(404).type('text').send('Not Found')
        } else {
            res.type('json').send(pet[index])
        }
    })
})



app.listen(PORT, function () {
    console.log(`Listening on ${PORT}`)
})

// ERROR FUNCTIONS
function serverError(error, res) {
    console.log(error.stack)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain')
    return res.end('Internal Server Error')
}

function notFound(res) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    return res.end('Not Found')
}

function goodSend(res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
}