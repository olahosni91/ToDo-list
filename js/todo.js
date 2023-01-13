var container;
var complete;
var body = document.getElementById('body');
var addBtn = document.getElementById('taskBtn');
let taskList = document.getElementById('list');
let completeList = document.getElementById('completeList');
let taskName = document.getElementById('taskName');

if (taskName.value == ''){
    addBtn.disabled = true;
}
taskName.addEventListener('input', () => {
    if(taskName.value == ''){
        addBtn.disabled = true;
    }else{
        addBtn.disabled = false;
        addBtn.addEventListener('click', newTask);
    }
});

let newTask = () => {
    let task = new Tasks(taskName.value);
    container.push(task);
    localStorage.setItem ("Tasks" , JSON.stringify(container));
    displayTask();
    clear();
}

var displayTask = () =>{
    let result = ``;
    if(container.length >= 1){
    for(let i = 0 ;i < container.length; i++)
            result += `
                        <div class='row justify-content-between bg-white mb-4 p-3 rounded'>
                            <p class="col-7 fs-6 my-auto">${container[i].taskName}</p>
                            <div class= 'col-2 my-auto'>
                                <i role="button" onclick="completeThis(${i})" class="text-success fs-4 mx-3 fas fa-check-circle" data-bs-toggle="modal" data-bs-target="#compModal"></i>
                                <i role="button" onclick="deleteThis(${i})" class=" text-danger fs-5 fas fa-trash"></i>
                            </div>
                        </div>`;
    }
    taskList.innerHTML = result;
}

let clear= () => {
    taskName.value = ``;
    addBtn.disabled = true;
}

let deleteThis = (id) => {
    container.splice(id, 1);
    localStorage.setItem('Tasks',JSON.stringify(container))
    displayTask();
}
var displayComp = () =>{
    let Res = ``;
    if(complete.length >= 1){
        document.getElementById('compNum').innerHTML =`<p class='fw-light'><i id='arrow' class="fas fa-chevron-down"></i> Completed <span class='fw-bold'> (${complete.length})</span><p>`;
        for(let i = 0; i < complete.length; i++)
        Res += ` <div class=" bg-success row justify-content-between fs-6 mb-4 p-3 bg-white rounded text-secondary">
                    <p class='col-7 text-decoration-line-through my-auto'>${complete[i].taskName} </p>
                    <i role="button" onclick="deleteComp(${i})" class="my-auto col-1 my-auto text-secondary fs-6 fas fa-trash"></i>
                </div> `;
    }
    else{
        document.getElementById('compNum').innerHTML = ``;
    }
    completeList.innerHTML = Res;
}


var completeThis = (id) => {
    let completedTask = new Completed(container[id].taskName);
    complete.push(completedTask);
    localStorage.setItem('completed tasks', JSON.stringify(complete));
    container.splice(id, 1);
    localStorage.setItem('Tasks', JSON.stringify(container));
    displayTask();
    displayComp();
}

let deleteComp = (id) =>{
    complete.splice(id, 1);
    localStorage.setItem('completed tasks',JSON.stringify(complete))
    displayComp();
}

if(localStorage.getItem("Tasks") == null){
    container = [];
    // complete = []
}else{
container = JSON.parse(localStorage.getItem("Tasks"));
displayTask();
}

if (localStorage.getItem("completed tasks") == null){
    complete = [];
}else{
complete = JSON.parse(localStorage.getItem('completed tasks'));
displayComp();
}


class Tasks{
    constructor(taskName){
        this.taskName = taskName;
    }
}

class Completed extends Tasks{
    constructor(taskName){
        super(taskName);
    }
}



