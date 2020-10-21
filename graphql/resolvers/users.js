const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');


const user = require('../../models/User');

module.exports = {
    Mutation: {
        async register(_, {registerInput : { username, email, password, confirmedPassword}}, context, info) {
            // TODO: Validate user data
            // TODO: make sure user doesn't already exists
            // TODO: Hash the password and create an auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const result = await newUser.save();

            const token = jwt.sign({
                id: result.id,
                email: result.email,
                username: result.username
            }, SECRET_KEY, { expiresIn: '1h'} );

            return {
                ...result._doc,
                id: result_id,
                token
            }
        }
    }
}