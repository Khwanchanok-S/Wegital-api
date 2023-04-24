const { User } = require('../models');
const createError = require('../utils/create-error');

const fs = require('fs');

exports.editUserProfile = async (req, res, next) => {
  console.log('--------------------_>', req.body);

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const { firstName, lastName, mobile, idcardNumber } = req.body;
    const value = { firstName, lastName, mobile, idcardNumber };
    const updateUser = await User.update(value, {
      where: { id: req.params.userId },
    });

    res.status(200).json({ value });
  } catch (err) {
    next(err);
  } finally {
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
      include: [
        {
          model: Data,
        },
      ],
    });

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.deleteUsers = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await User.destroy({
      where: {
        id: req.params.userId,
      },
    });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
