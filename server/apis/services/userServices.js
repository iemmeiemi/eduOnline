const User = require('../models/User');
const Instructor = require('../models/Instructor');
const Student = require('../models/Student');


const getOneUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        return user; // Trả về user hợp lệ
    } catch (err) {
        throw new Error(err.message); 
    }
};


const getAllUsers = async (user) => {
    try {
        const allUsers = await User.find();
        return allUsers;
    } catch (err) {
        throw new Error(err.message); 
    }
};

const getOneUserByIdFromOther = async (id) => {
    try {
        const createdUser = await User.findById(id)
            .select('-__v -role -wishlist'); // Loại bỏ password, version key, role và wishlist
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
        const createdUser = await User.findById(id).select('-__v'); // Loại bỏ password và version key
        if (!createdUser) {
            throw new Error('User not found');
        }
        return createdUser;
    } catch (err) {
        throw new Error(err.message);
    }
};

// const create = async (user) => {
//     try {
//         const updatedUser = await User.findByIdAndUpdate(user.id, user, { new: true, runValidators: true });
//         if (!updatedUser) {
//             throw new Error('User not found');
//         }
//         return updatedUser;
//     } catch (err) {
//         throw new Error(err.message); 
//     }
// };

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
    getOneUserByEmail,
    getAllUsers,
    getOneUserByIdFromOwner,
    getOneUserByIdFromOther,
    updateUser,
    banUser,
    makeAdmin,
};