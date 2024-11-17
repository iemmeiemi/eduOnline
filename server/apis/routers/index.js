const userRouters  = require('../routers/userRouters');
const {verifyAdmin} = require('../middlewares/verify');


const initRoutes = (app) => {
    app.use('/api/user', userRouters);
    
    app.use('/admin/user', userRouters);

    app.use('/', (req, res) => {
        res.send('Hello Foodi Client Server!');
    });
};

module.exports = initRoutes;