const express = require('express');
const router = express.Router();
const toDosCtrl = require('../../controllers/api/todos');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/toDos'

// POST /api/toDos (create a toDo)
router.post('/', ensureLoggedIn, toDosCtrl.create);
// GET /api/toDos (get all todos)
router.get('/:date', ensureLoggedIn, toDosCtrl.index);
// PUT /api/toDos/ (update a toDo)
router.put('/', ensureLoggedIn, toDosCtrl.update);
// DELETE /api/toDos (delete a single toDo)
router.delete('/:id', ensureLoggedIn, toDosCtrl.delete);
// GET /api/todos/year/:year/month/:month
router.get('/year/:year/month/:month', ensureLoggedIn, toDosCtrl.getForYearMonth);

module.exports = router;