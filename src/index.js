const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 8080

const routes = require('./routes')

console.log(app);


app.use(morgan('combined'))
app.use(express.urlencoded({
extended: true
})) 
app.use(express.json())


routes(app)

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})