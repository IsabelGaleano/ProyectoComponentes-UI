const express = require('express')
const app = express()
const {PORT = 3000} = process.env
const path = require('path');
const folder = path.join(__dirname, 'public');
app.use(express.static(folder))

app.get('/', (req, res) => res.send('Hello world'))

app.listen(PORT, () => console.log("SERVIDOR LEVANTADO"))