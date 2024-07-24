const { comparePassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

class AuthController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const newUser = await User.create({ username, email, password });
      const data = await User.findByPk(newUser.id, {
        attributes: {
          exclude: "password",
        },
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username) {
        throw { name: "USERNAME_REQUIRED" };
      }
      if (!password) {
        throw { name: "PASSWORD_REQUIRED" };
      }

      const user = await User.findOne({ where: { username } });

      if (!user) {
        throw { name: "AUTH_NOT_VALID" };
      }

      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: "AUTH_NOT_VALID" };
      }

      const access_token = signToken({
        id: user.id,
      });

      res.status(200).json({
        access_token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          imgUrl: user.imgUrl,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async googleSignIn(req, res, next) {
    try {
      const googleToken = req.headers.google_token;

      if (!googleToken) {
        throw { name: "GOOGLE_TOKEN_REQUIRED" };
      }

      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const email = payload.email;
      const username = email.split("@")[0];

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: username,
          email: payload.email,
          password: Math.random().toString(36).slice(-8),
          imgUrl: payload.picture,
        },
        hooks: false,
      });

      const access_token = signToken({
        id: user.id,
      });

      const status = created ? 201 : 200;
      console.log(user);
      res.status(status).json({
        access_token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          imgUrl: user.imgUrl,
        },
      });
    } catch (error) {
      console.log("Google Sign In Error: ", error);
      next(error);
    }
  }
}

module.exports = AuthController;
