const User = require('../models/User');

const createUser = async (user) => {
    try {
        const createdUser = await User.create(user);
        return createdUser;
    } catch (err) {
        throw new Error(err.message); 
    }
};

const getOneUserByIdFromOther = async (id) => {
    try {
        const createdUser = await User.findById(id)
            .select('-password -__v -role -wishlist'); // Loại bỏ password, version key, role và wishlist
        if (!createdUser) {
            throw new Error('User not found');
        }
        return createdUser;
    } catch (err) {
        throw new Error(err.message); 
    }
}; 

const getOneUserByIdFromOwner = async (id) => {
    try {
        const createdUser = await User.findById(id).select('-password -__v'); // Loại bỏ password và version key
        if (!createdUser) {
            throw new Error('User not found');
        }
        return createdUser;
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateUser = async (user) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(user.id, user, { new: true, runValidators: true });
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    } catch (err) {
        throw new Error(err.message); 
    }
};

// Soft delete
const banUser = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new Error('User not found');
        }
        return deletedUser; 
    } catch (err) {
        throw new Error(err.message); 
    }
};

const makeAdmin = async (id) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { role: 'admin' }, { new: true, runValidators: true });
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    createUser,
    getOneUserByIdFromOwner,
    getOneUserByIdFromOther,
    updateUser,
    banUser,
    makeAdmin,
};