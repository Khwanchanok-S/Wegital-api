const { Data, User } = require('../models');

exports.createData = async (req, res, next) => {
  console.log('asdasdasdasdasdasdasdasdasdasd', req.body);
  try {
    console.log(req.body);
    const newData = await Data.create({
      height: req.body.height,
      weight: req.body.weight,
      wasit: req.body.wasit,
      date: req.body.date,
      userId: req.user.id,
    });
    const data = await Data.findOne({
      where: {
        userId: req.user.id,
      },
      include: [{ model: User }],
      order: [['createdAt', 'DESC']],
    });
    res.status(201).json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getDataById = async (req, res, next) => {
  try {
    const data = await Data.findAll({
      where: {
        userId: req.params.userId,
      },
      include: [{ model: User }],
    });
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getAllData = async (req, res, next) => {
  try {
    const data = await Data.findAll();
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

exports.updateData = async (req, res, next) => {
  console.log('--------------------_>');

  try {
    const data = await Data.update(
      {
        height: req.body.height,
        weight: req.body.weight,
        wasit: req.body.wasit,
        date: req.body.date,
      },
      { where: { id: req.params.userId, userId: req.user.id } },
    );
    res.status(201).json({ data });
  } catch (err) {
    next(err);
  }
};

exports.deleteData = async (req, res, next) => {
  try {
    const data = await Data.destroy({
      where: {
        id: req.params.dataId,

        userId: req.user.id,
      },
    });
    res.status(201).json({ data });
  } catch (err) {
    next(err);
  }
};
