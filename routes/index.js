const express = require('express');
const
  createError = require('http-errors');
const validate = require('../validators/index');

const router = express.Router();

/**
 * Route renders index js, sets a UUID in session
 * @name get/
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', (req, res, next) => {
  try {
    return res.render('index', {
      form: req.session.form || {},
    });
  } catch (error) {
    return next(createError(500));
  }
});

/**
 * Route renders success after successful post message,
 * If validation passes set success = true in session
 * destorys session upon on succesful navigation
 * @name post/
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/', (req, res, next) => {
  try {
    validate.reset();

    const formData = req.body;
    req.session.form = formData;

    validate.body('text', formData.text).required().minlength(1).maxlength(10);

    if (validate.errors.length) {
      return res.render('index', {
        errors: validate.errors,
        form: req.session.form,
      });
    }

    req.session.success = true;

    return res.redirect('/success');
  } catch (error) {
    return next(createError(400));
  }
});

/**
 * Route renders success after successful post message,
 * checks to see if success is true in session, if it does not it redirects to index.
 * destorys session upon a succesful navigation
 * @name get/success
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/success', (req, res, next) => {
  try {
    if (!req.session.success) {
      return res.redirect('/');
    }
    req.session.destroy();
    return res.render('success');
  } catch (error) {
    return next(createError(500));
  }
});

module.exports = router;
