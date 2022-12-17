const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://fieldguide:fieldguide@cluster0.gthkqr5.mongodb.net/?retryWrites=true&w=majority'

app.use(cors())
app.use(express.json())

MongoClient.connect(connectionString)
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-trek-api')
        const infoCollection = db.collection('alien-info')


    app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
    })

    app.get('/api/:alienName', (request, response) => {
    const aliensName = request.params.alienName.toLowerCase()
        infoCollection.find({name: aliensName}).toArray()
        .then(results => {
            console.log(results)
            response.json(results[0])
        })
        .catch(error => console.error(error))
    })

})
.catch(error => console.error(error))

app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running.')
})