const router = require('express').Router();
const tasksdb = require('../db/to-do-item-db');
const categoriesdb = require('../db/categories-db');

router.get('/', async (req, res) => {
    const tasks = await tasksdb.getIncompleteTasks();
    res.render('tasks/index', { tasks });
});

router.get('/completed', async (req, res) => {
    const tasks = await tasksdb.getCompletedTasks();
    res.render('tasks/completed', { tasks });
});

router.get('/addtask', async (req, res) => {
    const categories = await categoriesdb.getCategories();
    res.render('tasks/addtask', { categories });
});

router.post('/addtask', async (req, res) => {
    await tasksdb.addTask(req.body);
    res.redirect('/tasks');
});


router.post('/markAsCompleted', async (req, res) => {
    await tasksdb.markTaskCompleted(req.body);
    console.log(req.body);
    res.redirect('/tasks/');
});

module.exports = router;