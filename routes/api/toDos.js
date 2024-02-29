const express = require('express');
const router = express.Router();
const toDosCtrl = require('../../controllers/api/toDos');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/users'

// POST /api/toDos (create a toDo)
router.post('/', toDosCtrl.create);
// GET /api/toDos (get all todos)
router.get('/:date', toDosCtrl.index);

module.exports = router;