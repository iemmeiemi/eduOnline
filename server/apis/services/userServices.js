const User = require('../models/User');

const createUser =  (user) => {
    return new Promise((resolve, reject) => {
        User.create(user)
            .then((createdUser) => {
                resolve(createdUser);
            })
            .catch((err) => {
                reject(err); 
            });
    });
}
    

module.exports = {
    createUser,

}