const { generateAccessToken } = require('../middlewares/token');
const User = require('../models/User');
const Student = require('../models/Student');
const Instructor = require('../models/Instructor');

const refreshAccessToken = async (data) => {
    try {
        const user = await User.findOne({ email: data.email });
        if (!user) {
            throw new Error('User not found');
        }
        let roleUser = null;
        switch (user.role) {
            case 'instructor':
                roleUser = await Instructor.find({userRef: user._id});
                break;
            case 'student':
                roleUser = await Student.find({userRef: user._id});
                break;
            default:
                break;
        }
        const accessToken = generateAccessToken(
            user._id,
            user.email,
            user.role
        );
        return { accessToken: accessToken, user, role: roleUser[0] };
    } catch (err) {
        throw new Error(err.message);
    }
};

const create = async (role, id) => {
    try {
        switch (role) {
            case 'student':
                const student = Student.create({ userRef: id });
                return student;
            case 'instructor':
                const instructor = Instructor.create({ userRef: id });
                return instructor;
            default:
                return null;
        }
    } catch (error) {
        console.log(error.message);
        throw new Error(error);
    }
};

const register = async (data) => {
    try {
        // Kiểm tra nếu user đã tồn tại
        const existingUser = await User.findOne({
            email: data.user.email,
        }).select('-role -__v');
        if (existingUser) {
            throw new Error(
                'User with this email already exists, please Sign in'
            );
        }
        // Tạo người dùng mới
        const user = await User.create(data.user);
        if (!user) {
            throw new Error('Error creating user');
        }

        const userDetail = await create(data.user.role, user._id);

        return { user, userDetail };
    } catch (err) {
        console.log(err);
        throw new Error(err.message || 'An error occurred during registration');
    }
};

const registerGoogle = async (data) => {
    try {
        // Kiểm tra nếu user đã tồn tại
        const existingUser = await User.findOne({
            email: data.user.email,
        }).select('-role -__v');
        if (existingUser) {
            const method = existingUser.authMethod;
            if (method === 'gg') {
                return existingUser;
            } else {
                throw new Error(`method`);
            }
        }
        // Tạo người dùng mới
        const user = await User.create(data.user);
        if (!user) {
            throw new Error('db');
        }
        const userDetail = create(data.user.role, user._id);
        return { user, userDetail };
    } catch (err) {
        console.log(err);
        throw new Error(err.message || 'An error occurred during registration');
    }
};

module.exports = {
    refreshAccessToken,
    register,
    registerGoogle,
};
