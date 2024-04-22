// middleware/verifyToken.js
var jwt = require('jsonwebtoken');

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Secret Key, use this to sign and verify, must be same in both functions or else validation will fail. //
// wwDcXecrzQvWFr2_pOGz1oR6ngE4nIEzDLJSGPA-aoQ                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

const verifyToken = (req, res, next) => {
    try {
       
      //  const token = req.headers['authorization'];
       const token = req.headers.authorization.split(' ')[1];
       console.log('Token received on server:', token);

       if (!token) {
         return res.status(403).json({ message: 'No token provided' });
       }
   
       const decoded = jwt.verify(token, "wwDcXecrzQvWFr2_pOGz1oR6ngE4nIEzDLJSGPA-aoQ");
       console.log('Decoded token:', decoded); 
       req.userId = decoded.userId;
       next();
    } catch (error) {
       console.error('Error verifying token:', error);
       res.status(401).json({ message: 'Unauthorized', error: error.message }); 
    }
   };
   
   

module.exports = verifyToken;
