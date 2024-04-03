const tasksDiv = document.querySelector(".tasks");
const taskMssg = document.querySelector(".text-message");
const createForm = document.querySelector(".create-form");

function showAllTasks(tasks){
    if(tasks.length==0){
        taskMssg.style.display = "block";
        taskMssg.textContent = "No Task in List."
        tasksDiv.innerHTML = "";
    }else{
        taskMssg.style.display = "none";
        const allTasks = tasks.map(task => {
            return `<div class="task">
                            <p class="name ${task.completed?"completed": ""}">${task.name}</p>
                            <a href="task.html?id=${task._id}" class="edit task-bttn"><i class="fa-solid fa-pen-to-square"></i></a>
                            <button class="delete task-bttn" data-id=${task._id}><i class="fa-solid fa-trash"></i></button>
                        </div>`
        }).join("");
        tasksDiv.innerHTML = allTasks;
        const deleteBttns = document.querySelectorAll(".delete");
        deleteBttns.forEach(bttn => {
            bttn.addEventListener("click", (e)=>{
                let id = "";
                if(e.target.classList.contains("delete")){
                    id = e.target.dataset.id;
                }else{
                    id = e.target.parentElement.dataset.id;
                }
                deleteTask(id);
            });
        });
    }    
}
async function getAllTasks(){
    try {
        const tasks = await axios.get("/api/v1/tasks");
        showAllTasks(tasks.data);
    } catch (error) {
        console.log(error);
    }
}
async function deleteTask(id){
    try {
        await axios.delete(`/api/v1/tasks/${id}`);
        getAllTasks();
    } catch (error) {
        console.log(error);
    }
}


getAllTasks();

createForm.addEventListener("submit", async (event)=>{
    event.preventDefault();
    const name = document.querySelector("#name");
    const mssg = document.querySelector(".create-mssg");
    try {
        await axios.post("/api/v1/tasks", {name: name.value});
        getAllTasks();
        mssg.style.display = "block";
        mssg.textContent = "Task Added successfully";
        mssg.classList.remove("error-mssg");
        mssg.classList.add("success-mssg");
        name.value = "";
    } catch (error) {
        console.log(error);
        // mssg.style.display = "block";
        // mssg.textContent = error.errors.name.message;
        // mssg.classList.remove("success-mssg");
        // mssg.classList.add("error-mssg");
    }
    setTimeout(()=>{
        mssg.style.display = "none";
    }, 3000);
});
