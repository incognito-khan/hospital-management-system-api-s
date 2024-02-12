const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {dbConnector} = require('../service/authService');

class AuthService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async findUser(username) {
    return this.userModel.findOne({ username });
  }

  generateToken(user) {
    return jwt.sign({ username: user.username, role: user.role }, 'cadakdamamndaerqeid90dkdekiuee8er7efnanfj', { expiresIn: '10s' });
  }

  async getToken(user) {
    if ('token' in user) {
      return user.token;
    }
  }

  async verifyToken(token) {
    try {
      jwt.verify(token, 'cadakdamamndaerqeid90dkdekiuee8er7efnanfj');
      return true;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return false;
      }
      throw err;
    }
  }

  // async invalidateToken(user) {
  //   // Find the token in the database
  //   const tokenRecord = await Token.findOne({ where: { userId: user.id } });

  //   if (tokenRecord) {
  //     // If the token exists, set it to null or delete it
  //     await tokenRecord.destroy();
  //   }
  // }

  async tokenExpired(token) {
    try {
      jwt.verify(token, 'cadakdamamndaerqeid90dkdekiuee8er7efnanfj');
      return false;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return true;
      }
      throw err;
    }
  }

  async replaceToken(token) {
    try {
      user = new User(userDetails);
      newToken = token
      user.replaceOne(token, newToken);
      return res.status(200).json({ message: 'Token replaced successfully', token: newToken });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    } finally {
      dbConnector.close();
    }
  }

  async validatePassword(plainTextPassword, hashedPassword) {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  checkRole(userRole) {
    return userRole === 'Admin';
  }
}
const authService = new AuthService(User);
module.exports = authService;