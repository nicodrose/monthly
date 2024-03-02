const ToDo = require('../../models/todo');

module.exports = {
  create,
  index, 
  update,
  delete: deleteToDo
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

async function update(req, res) {
  try {
    const updatedToDo = await ToDo.findByIdAndUpdate(req.body._id, req.body, {new: true});
    res.json(updatedToDo); 
  } catch (err) {
    console.log(err);
    res.status(400).json('Update ToDo Failed');
  }
}

async function deleteToDo(req, res) {
  try {
    const deletedToDo = await ToDo.findByIdAndDelete(req.params.id);
    res.json(deletedToDo);
  } catch (err) {
    console.log(err);
    res.status(400).json('Delete ToDo Failed');
  }
}
