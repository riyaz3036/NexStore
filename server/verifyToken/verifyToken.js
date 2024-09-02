const jwt = require('jsonwebtoken');

// Middleware to verify user token
const verifyUser = (req, res, next) => {
    const token = req.cookies?.accessToken;

    if (!token) {
        return res.status(403).json({ success: false, message: 'Access denied, no token provided' });
    }

    try {
        const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
    verifyUser(req, res, () => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access denied, you do not have admin privileges' });
        }
        next(); 
    });
};

module.exports = { verifyUser, verifyAdmin };
