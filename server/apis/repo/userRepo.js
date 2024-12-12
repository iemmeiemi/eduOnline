const User = require("../models/User");

const userRepository = {
    /**
     * Find a user by their email.
     * @param {string} email - Email address of the user to find.
     * @returns {Promise<Object|null>} The user document or null if not found.
     */
    findByEmail: async (email) => {
        return await User.findOne({ email });
    },

    /**
     * Create a new user.
     * @param {Object} userData - The data for the new user.
     * @returns {Promise<Object>} The created user document.
     */
    createUser: async (userData) => {
        const user = new User(userData);
        return await user.save();
    },

    /**
     * Update a user's information.
     * @param {string} userId - ID of the user to update.
     * @param {Object} updateData - Fields to update.
     * @returns {Promise<Object|null>} The updated user document or null if not found.
     */
    updateUser: async (userId, updateData) => {
        return await User.findByIdAndUpdate(userId, updateData, {
            new: true, // Return the updated document
        });
    },

    /**
     * Delete a user by their ID.
     * @param {string} userId - ID of the user to delete.
     * @returns {Promise<Object|null>} The deleted user document or null if not found.
     */
    deleteUser: async (userId) => {
        return await User.findByIdAndDelete(userId);
    },

    /**
     * Get a paginated list of users.
     * @param {number} page - The page number.
     * @param {number} limit - Number of users per page.
     * @returns {Promise<Object>} Paginated users and meta info.
     */
    getUsersPaginated: async (page = 1, limit = 10) => {
        const users = await User.find()
            .skip((page - 1) * limit)
            .limit(limit);
        const total = await User.countDocuments();
        return {
            users,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    },
};

module.exports = userRepository;
