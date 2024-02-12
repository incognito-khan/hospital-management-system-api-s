const authService = require('../service/authService.js');
const jwt = require('jsonwebtoken');

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await this.authService.findUser(username);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const passwordMatch = await this.authService.validatePassword(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      const token = await this.authService.getToken(user);

      if (token) {
        if (this.authService.verifyToken(token)) {
          return res.status(200).json({ message: 'User login successful by token', token });
        }
         else {
          return res.status(401).json({ message: 'Login Expired!', token: token });
        }
      }

      // if(!token) {
      //   // If the user doesn't have a token, generate a new one for them
      //   const newToken = this.authService.generateToken(user);
      //   this.authService.replaceToken(newToken, user);
      //   return res.status(401).json({ message: 'Login Expired!', token: newToken });
      //   // return res.status(200).json({ message: 'Login Successful with new token', token: newToken });
      // }

      const tokenExpired = this.authService.tokenExpired(token);

      if (tokenExpired) {
        return res.status(401).json({ message: 'Login Expired!', token: token });
      }

      if (!token) {
        return res.status(404).json({ message: 'Token not found' });
      }

      if (!this.authService.checkRole(user.role)) {
        return res.status(403).json({ error: 'Forbidden: only admins can log in' });
      }
      console.log("Login Successful", username, password);

      res.status(200).json({ message: 'User login successful', token });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}


const authController = new AuthController(authService);
module.exports = { authController };