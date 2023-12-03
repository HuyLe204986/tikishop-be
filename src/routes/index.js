const UserRouter = require('./UserRouter')
const ProducRouter = require('./ProductRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProducRouter)
}

module.exports = routes;
