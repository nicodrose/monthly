const express = require('express');
const router = express.Router();
const toDosCtrl = require('../../controllers/api/toDos');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/toDos'

// POST /api/toDos (create a toDo)
router.post('/', toDosCtrl.create);
// GET /api/toDos (get all todos)
router.get('/:date', toDosCtrl.index);
// PUT /api/toDos/ (update a toDo)
router.put('/', toDosCtrl.update);
// DELETE /api/toDos (delete a single toDo)
router.delete('/:id', toDosCtrl.delete);

module.exports = router;