const { generateAccessToken } = require('../middlewares/token');
const User = require('../models/User');

const refreshAccessToken = async (data) => {
    try {
        const user = await User.findOne({ email: data.email }); 
        if (!user) {
            throw new Error("User not found");
        }
        const accessToken = generateAccessToken(user._id, user.email, user.role);
        return { accessToken: accessToken, user };
    } catch (err) {
        throw new Error(err.message);
    }
};

const register = async (data) => {
    try {
        // Kiểm tra nếu user đã tồn tại
        const existingUser = await User.findOne({ email: data.user.email }).select('-role -__v');
        if (existingUser) {
            throw new Error("User with this email already exists, please Sign in");
        }
        // Tạo người dùng mới
        const user = await User.create(data.user).select('-role -__v');
        if (!user) {
            throw new Error("Error creating user");
        }
        return user; 
    } catch (err) {
        throw new Error(err.message || "An error occurred during registration");
    }
};

const registerGoogle = async (data) => {
    try {
        // Kiểm tra nếu user đã tồn tại
        const existingUser = await User.findOne({ email: data.user.email }).select('-role -__v');
        if (existingUser) {
            const method = existingUser.authMethod;
            if (method === 'gg') {
                return existingUser;
            } else {
                throw new Error(`method`);
            }
        }
        // Tạo người dùng mới
        const user = await User.create(data.user).select('-role -__v');
        if (!user) {
            throw new Error("db");
        }
        return user; 
    } catch (err) {
        throw new Error(err.message || "An error occurred during registration");
    }
};


module.exports = {
    refreshAccessToken,
    register,
    registerGoogle,
    

};