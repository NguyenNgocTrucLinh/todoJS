//get data from localStorage
function getTask() {
    var listTask = new Array;
    var local = localStorage.getItem('task');
    if (local != null) {
        listTask = JSON.parse(local);
    }
    return listTask;
}
function getTaskCompleted() {
    var listTaskCompleted = new Array;
    var local = localStorage.getItem('taskComplete');
    if (local != null) {
        listTaskCompleted = JSON.parse(local);
    }
    return listTaskCompleted;
}

//table task added
function createTableTask(array) {

    //clean tbody
    var tbodyTaskAdded = document.getElementById('tbodyTaskAdded');
    tbodyTaskAdded.innerHTML = '';

    for (var i = 0; i < array.length; i++) {
        //crate tag td
        var tdId = document.createElement('td');
        var tdTaskName = document.createElement('td');
        var tdStatus = document.createElement('td');

        //put value
        tdId.innerHTML = i + 1;
        tdTaskName.innerHTML = array[i].NameTask;
        tdStatus.innerHTML =
            '<button class="btn btnDelete" id="btnDelete_' + i + '">Delete</button>  <button class="btn btnComplete" id="btnComplete_' + i + '">Complete</button>'

        // Append the <td> to <tr>
        var trTag = document.createElement('tr');
        trTag.appendChild(tdId);
        trTag.appendChild(tdTaskName);
        trTag.appendChild(tdStatus);

        // Append the <tr> to <tbody>
        tbodyTaskAdded.appendChild(trTag);

        deleteTask('btnDelete_' + i);
        completeTask('btnComplete_' + i);
    }
}

//add task 
function addTask() {

    //take value from input
    var nameTask = document.getElementById('taskInput').value;

    if (nameTask != '') {
        var listTask = getTask();
        var newTodo = new Task(nameTask);
        listTask.push(newTodo);
        localStorage.setItem('task', JSON.stringify(listTask));
        createTableTask(listTask);
        document.getElementById('taskInput').value = '';
    }
    else {
        alert("No infomation!!!");
        document.getElementById('taskInput').focus();
    }

}

//delete task
function deleteTask(idBtn) {
    var listTask = getTask();

    var btnDeleteTask = document.getElementById(idBtn);
    btnDeleteTask.addEventListener('click', function () {
        var id = idBtn.slice(10);

        for (var i = 0; i < listTask.length; i++) {

            if (Number(id) === i) {
                listTask.splice(i, 1);
                localStorage.setItem('task', JSON.stringify(listTask));
                break;
            }
        }

        createTableTask(listTask);
    });

}
//table task complete
function createTableTaskCompleted(array) {
    //clean tbody
    var tableTaskCompleted = document.getElementById('tbodyTaskCompleted');
    tableTaskCompleted.innerHTML = '';

    for (var i = 0; i < array.length; i++) {

        //crate tag td
        var tdId = document.createElement('td');
        var tdTaskName = document.createElement('td');

        //put value
        tdId.innerHTML = i + 1;
        tdTaskName.innerHTML = array[i].NameTask;

        // Append the <td> to <tr>
        var trTag = document.createElement('tr');
        trTag.appendChild(tdId);
        trTag.appendChild(tdTaskName);

        // Append the <tr> to <tbody>
        tableTaskCompleted.appendChild(trTag);
    }
}
//complete task
function completeTask(idBtn) {
    var listTask = getTask();
    var listTaskCompleted = getTaskCompleted();

    var btnCompleteTask = document.getElementById(idBtn);
    btnCompleteTask.addEventListener('click', function () {
        id = idBtn.slice(12);

        for (var i = 0; i < listTask.length; i++) {

            if (Number(id) == i) {

                listTaskCompleted.push(listTask[i]);
                localStorage.setItem('taskComplete', JSON.stringify(listTaskCompleted));

                listTask.splice(i, 1);
                localStorage.setItem('task', JSON.stringify(listTask));
                break;
            }
        }
        createTableTask(listTask);
        createTableTaskCompleted(listTaskCompleted);
    });
}


//load ready
var listTaskAdd = getTask();
console.log(listTaskAdd);
createTableTask(listTaskAdd);
var listTaskComplete = getTaskCompleted();
createTableTaskCompleted(listTaskComplete);

//event for btnAddTask
var btnAddTask = document.getElementById('btnAdd');
btnAddTask.addEventListener('click', addTask);