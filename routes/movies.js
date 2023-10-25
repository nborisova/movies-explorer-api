const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../utils/constants');
const {
  getAllMovies,
  createMovie,
  doesMovieExist,
  isMovieOwner,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getAllMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlRegex),
    trailerLink: Joi.string().required().regex(urlRegex),
    thumbnail: Joi.string().required().regex(urlRegex),
    owner: Joi.string().length(24).hex().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);
router.delete('/:movieId', doesMovieExist);
router.delete('/:movieId', isMovieOwner);
router.delete('/:movieId', deleteMovie);

module.exports = router;
