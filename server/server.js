const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const {getBabies, createBaby, deleteBaby} = require('./controller')

app.get('/api/babies', getBabies)
app.post('/api/babies', createBaby)
app.delete('/api/babies', deleteBaby)

app.listen(9009, () => console.log(`Fussing on port 9009`))