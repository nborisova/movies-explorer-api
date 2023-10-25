const User = require('../models/users');
const InternalServerError = require('../errors/internal-server-err');
const BadRequestError = require('../errors/bad-request-err');

const getCurrentUser = (req, res, next) => {
  // const { _id } = req.user;
  const { _id } = '65383003f7f436ed30aff69a';

  User.findOne({ _id })
    .then((user) => res.send(user))
    .catch(() => next(new InternalServerError('На сервере произошла ошибка')));
};

const updateUserInfo = (req, res, next) => {
  const { _id } = req.user;
  const { email, name } = req.body;

  User.findByIdAndUpdate(_id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорретные данные'));
      } else {
        next(new InternalServerError('На сервере произошла ошибка'));
      }
    });
};

module.exports = {
  getCurrentUser,
  updateUserInfo,
};
