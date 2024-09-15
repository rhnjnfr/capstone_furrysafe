import jwt from 'jsonwebtoken';  // Import the default export
const { sign, verify } = jwt;  

// Secret key for signing and verifying the token
const SECRET_KET = 'secretkey' 

function createToken(user) {
    console.log("creating token...")
    const payload = sign ({
      id: user.id,
      username: user.username,
      email: user.email,
      usetype: user.usertype
    })
  
    // Sign the token with the payload and the secret key, set an expiration time
    const token = jwt.sign(payload, SECRET_KET, { expiresIn: '1h' });
    return token;
  }

// Verify a JWT
function verifyToken(token) {
    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, SECRET_KET);
      return decoded;
    } catch (error) {
      // Handle invalid or expired tokens
      return null;
    }
  }

export {
    createToken, 
    verifyToken
}