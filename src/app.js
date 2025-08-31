const express = require('express')
require('./db/mongoose')
const task = require('./routers/task')

const app = express()
const port = 3000

app.use(express.json())
app.use(task)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
