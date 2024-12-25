const userRouters  = require('../routers/userRouters');
const authRouters  = require('../routers/authRouters');
const classRouters  = require('../routers/classRoutes');
const categoryRouters  = require('../routers/categoryRouters');

const {verifyAdmin} = require('../middlewares/verify');


const initRoutes = (app) => {
    app.use('/api/user', userRouters);
    app.use('/api/auth', authRouters);
    app.use('/api/class', classRouters);
    app.use('/api/category', categoryRouters);

    app.use('/admin/user', userRouters);

    app.use('/', (req, res) => {
        res.send('Hello Foodi Client Server!');
    });
};

module.exports = initRoutes;