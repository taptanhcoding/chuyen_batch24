
const routeAuth = require('./auth')


function route(app) {
    app.use('/',routeAuth)
}
 
module.exports = route