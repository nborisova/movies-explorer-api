const Movie = require('../models/movies');
const InternalServerError = require('../errors/internal-server-err');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');

const CREATED = 201;

const getAllMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(() => next(new InternalServerError('На сервере произошла ошибка')));
};

const createMovie = (req, res, next) => {
  const { _id } = req.user;
  const {
    country, director, duration, year, description,
    image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: _id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      movie.populate('owner')
        .then((populatedMovie) => res.status(CREATED).send(populatedMovie))
        .catch(() => next(new InternalServerError('На сервере произошла ошибка')));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(new InternalServerError('На сервере произошла ошибка'));
      }
    });
};

const doesMovieExist = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;

  Movie.findOne({ movieId, owner: _id })
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Такого фильма нет'));
      } else {
        next();
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректно задан id фильма'));
      } else {
        next(new InternalServerError('На сервере произошла ошибка'));
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;

  Movie.findOneAndRemove({ movieId, owner: _id })
    .then(() => res.send({ message: 'Фильм удалён' }))
    .catch(() => next(new InternalServerError('На сервере произошла ошибка')));
};

module.exports = {
  getAllMovies,
  createMovie,
  doesMovieExist,
  deleteMovie,
};
