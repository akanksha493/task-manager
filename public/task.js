const editForm = document.querySelector(".edit-form");
const url = new URLSearchParams(window.location.search);
const id = url.get('id');

async function getATask(){
    try {
        const task = await axios.get(`/api/v1/tasks/${id}`);
        showATask(task.data);
    } catch (error) {
        console.log(error);
    }
}
function showATask(task){
    console.log(task);
    document.querySelector("#updated-name").value = task.name;
    if(task.completed) document.querySelector("#completed").checked = true;
    else document.querySelector("#completed").checked = false;
}

editForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const updatedName = document.querySelector("#updated-name").value;
    const updatedCompleted = document.querySelector("#completed").checked? true: false;
    const mssg = document.querySelector(".edit-mssg");
    try {
        await axios.patch(`/api/v1/tasks/${id}`, {
            name: updatedName,
            completed: updatedCompleted
        });
        getATask();
        mssg.style.display = "block";
        mssg.textContent = "Task updated successfully";
        mssg.classList.remove("error-mssg");
        mssg.classList.add("success-mssg");
    } catch (error) {
        console.log(error);
    }
    setTimeout(()=>{
        mssg.style.display = "none";
    }, 3000);
    
})

getATask();