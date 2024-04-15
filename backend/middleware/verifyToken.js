// middleware/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
       
       const token = req.headers['authorization'];
       console.log('Token received on server:', token);

       if (!token) {
         return res.status(403).json({ message: 'No token provided' });
       }
   
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       console.log('Decoded token:', decoded); 
       req.userId = decoded.userId;
       next();
    } catch (error) {
       console.error('Error verifying token:', error);
       res.status(401).json({ message: 'Unauthorized', error: error.message }); 
    }
   };
   
   

module.exports = verifyToken;
