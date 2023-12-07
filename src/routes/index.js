const UserRouter = require('./UserRouter')
const ProducRouter = require('./ProductRouter')
const OrderRouter = require('./OrderRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProducRouter)
    app.use('/api/order', OrderRouter)
    
}

module.exports = routes;
