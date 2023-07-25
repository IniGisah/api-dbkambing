const express = require('express');
const router = express.Router();
const dbworker = require('../services/dbworker');
const auth = require('../services/auth')

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await dbworker.getMultiple());
  } catch (err) {
    console.error(`Error while getting weight data `, err.message);
    next(err);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    res.json(await dbworker.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting weight data `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', auth.isAuth, async function(req, res, next) {
    try {
      res.json(await dbworker.create(req.body));
    } catch (err) {
      console.error(`Error while creating weight data`, err.message);
      next(err);
    }
  });

/* PUT programming language */
router.put('/:id', auth.isAuth, async function(req, res, next) {
  try {
    res.json(await dbworker.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating weight data`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:id', auth.isAuth, async function(req, res, next) {
  try {
    res.json(await dbworker.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting weight data`, err.message);
    next(err);
  }
});

module.exports = router;