const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const createError = require('../utils/create-error');
const bcrypt = require('bcryptjs');

exports.register = async (req, res, next) => {
  console.log('-------------------__>', req.body);
  try {
    const value = req.body;
    const user = await User.findOne({
      where: { userName: { [Op.eq]: value.userName } },
    });
    if (user) {
      createError('Username is already registered', 400);
    }

    value.password = await bcrypt.hash(value.password, 12);
    await User.create(value);

    res.status(201).json({ message: 'register success' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;

    const user = await User.findOne({
      where: { userName: { [Op.eq]: userName } },
    });

    if (!user) {
      createError('User not found, invalid Username or password', 400);
    }

    const isMatch = password === user.password;
    if (!isMatch) {
      createError('User not found, invalid Username or password', 400);
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        mobile: user.mobile,
        idcardNumber: user.idcardNumber,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
