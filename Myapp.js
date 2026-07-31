const express = require('express');
const app = express();
app.use(express.json())

app.listen(3000);

const tasks = require('./routes/tasks');

app.get('/tasks', (req, res) =>{
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const {title } = req.body;
    if(!title)
    {
       return res.status(400).json({ error: 'Task title is required'}) ;
    }
    const newTask = {
        id: tasks.length + 1,
        title: title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.listen(3000, () => {
    console.log('server listening on port 3000');
})