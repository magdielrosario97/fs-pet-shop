const fs = require('fs')
const http = require('http')
const path = require('path')
const url = require('url')
const petsPath = path.join(__dirname, 'pets.json')

const PORT = 4545

const server = http.createServer(function (req, res) {
    if (req.method === 'GET' && req.url === '/pets') {
        fs.readFile(petsPath, 'utf8', function (err, petsJSON) {
            if (err) {
                console.log(err.stack)
                res.statusCode = 500
                res.setHeader('Content-Type', 'text/plain')
                return res.end('Internal Server Error')
            }

            res.setHeader('Content-Type', 'application/json')
            res.end(petsJSON)
        })
    } else if (req.method === 'GET' && req.url === '/pets/0') {
        fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
            if (err) {
                console.log(err.stack)
                res.statusCode = 500
                res.setHeader('Content-Type', 'text/plain')
                return res.end('Internal Server Error')
            }
    
            const pets = JSON.parse(petsJSON)
            const petJSON = JSON.stringify(pets[0])
    
            res.setHeader('Content-Type', 'application/json')
            res.end(petJSON)
        })
    } else if (req.method === 'GET' && req.url === '/pets/1') {
        fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
            if (err) {
                console.log(err.stack)
                res.statusCode = 500
                res.setHeader('Content-Type', 'text/plain')
                return res.end('Internal Server Error')
            }
    
            const pets = JSON.parse(petsJSON)
            const petJSON = JSON.stringify(pets[1])
    
            res.setHeader('Content-Type', 'application/json')
            res.end(petJSON)
        })
    } else if(req.method === 'POST' && req.url === '/pets?') {
        let test = req.url + "name=Bobby&age=5&kind=Goat.json"
        console.log(JSON.stringify(test))
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end('Not Found')
    }
})


server.listen(PORT, function () {
    console.log('Listening on port', PORT)
})

module.exports = server
