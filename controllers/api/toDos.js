const ToDo = require('../../models/todo');

module.exports = {
  create,
  index
};

async function create(req, res) {
  req.body.user = req.user._id;
  const toDo = await ToDo.create(req.body);
  res.json(toDo);
}

async function index(req, res) {
  const todos = await ToDo.find({date: req.params.date});
  console.log(todos);
  res.json(todos);
}