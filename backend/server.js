const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./config/keys_dev').mongoURI;
const todoRoutes = express.Router();

let Todo = require('./todo.model');

mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());

todoRoutes.route('/').get((req, res) => {
    Todo.find((err, todos) => {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get((req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => {
        res.json(todo);
    });
});

todoRoutes.route('/add').post((req, res) => {
    let todo = new Todo(req.body)
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added sucessfully'});
        })
        .catch(err => {
            res.status(400).send('add new todo failed');
        });
});

todoRoutes.route('/update/:id').post((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (!todo) {
            res.statusMessage(404).send('data not found');
        } else {
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});


app.use('/todos', todoRoutes);

const PORT = 4000;

app.listen(PORT, () => {
    console.log("Server is running on Port: " + 4000);
});