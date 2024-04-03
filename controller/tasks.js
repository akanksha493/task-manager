const taskModel = require("../models/tasks");

const getAllTasks = async (req, res, next) =>{
    try {
        const allTasks = await taskModel.find({});
        res.status(200).json(allTasks);
    } catch (error) {
        res.status(500).json(error);
    }
}
const createTask = async (req, res, next) => {
    try {
        const task = await taskModel.create(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json(error);
    }
}
const getTask = async (req, res, next) => {
    try {
        const taskID = req.params.id;
        const task = await taskModel.findOne({_id: taskID})
        if(task == null){
            return res.status(404).json({msg: `No task with given id: ${taskID}`});
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json(error);
    }
}
const updateTask = async (req, res, next) => {
    try {
        const taskID = req.params.id;
        const updatedTask = await taskModel.findOneAndUpdate({_id: taskID}, req.body, {
            returnDocument: "after",
            runValidators: true
        });
        if(updatedTask == null){
            return res.status(404).json({msg: `No task found with given id: ${taskID}`});
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json(error);
    }
}
const deleteTask = async (req, res, next) => {
    try {
        const taskID = req.params.id;
        const task = await taskModel.findOneAndDelete({_id: taskID});
        if(task == null){
            return res.status(404).json({msg: `No task with given id: ${taskID}`})
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}