const mongoose = require("mongoose");
const schema = mongoose.Schema;

const taskSchema = new schema({
    name: {
        type: String,
        required: [true, "name must be provided"],
        trim: true
    }, 
    completed: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model("Task", taskSchema);