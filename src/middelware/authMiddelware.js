const jwt = require('jsonwebtoken');
const database = require('../database/connection'); 

exports.authMiddleware = (allowedRoles = []) => {
    return async (req, res, next) => {
        // Extract token from the Authorization header
        const authHeader = req.header('Authorization');

        // Check if the token exists and starts with 'Bearer '
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        // Extract the token part from 'Bearer <token>'
        const token = authHeader.split(' ')[1]?.trim();

        // Check if the token is empty after extraction
        if (!token) {
            return res.status(401).json({ msg: 'Token is missing or malformed' });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Query the user and their role from the database
            const userQuery = 'SELECT id, name, email, role FROM users WHERE id = $1';
            const userResult = await database.query(userQuery, [decoded.id]);

            // Check if the user exists in the database
            if (userResult.rows.length === 0) {
                return res.status(401).json({ msg: 'User not found, authorization denied' });
            }

            const user = userResult.rows[0];

            // Check if the user's role is allowed to access the route
            if (allowedRoles.length && !allowedRoles.includes(user.role)) {
                return res.status(403).json({ msg: 'Access denied: Insufficient permissions' });
            }

            // Attach user info to the request object
            req.user = user;
            next();
        } catch (err) {
            // Check for specific token errors and log them
            if (err.name === 'JsonWebTokenError') {
                console.error('Token verification error: JWT malformed', err);
                return res.status(401).json({ msg: 'Token is not valid or malformed' });
            } else if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ msg: 'Token expired' });
            }

            // General error handling
            console.error('Token verification error:', err);
            res.status(500).json({ msg: 'Server error' });
        }
    };
};

