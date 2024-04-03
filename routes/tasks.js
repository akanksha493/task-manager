const express = require("express");
const router = express.Router();
const controller  = require("../controller/tasks");

router.get("/", controller.getAllTasks);

router.post("/", controller.createTask);

router.get("/:id", controller.getTask);

router.patch("/:id", controller.updateTask);

router.delete("/:id", controller.deleteTask);


module.exports = router;

