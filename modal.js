const basePath = "http://localhost:8082/TaskServices/api/services";
const brokerPath = `${basePath}/broker`;

function aPathHandler (subpath) {
    return basePath + "/" + subpath;
}

const pathHandler = subPath => `${brokerPath}/${subPath}`;

//While the last two paths are not exactly neccessary, they were added so that if these path locations were updated later, the methods need not be changed. Just the const.
const API_PATHS = {
    GET_STATUSES: pathHandler("allstatuses"),
    GET_TASK_LIST: pathHandler("tasklist"),
    POST_TASK: pathHandler("task"),
    PUT_TASK: pathHandler("task"),
    DELTE_TASK: pathHandler("task"),
}

const dataRequest = async (url, config, body) => {
    if (body) {
        config.body = JSON.stringify(body);
        config.headers = {"Content-type": "application/json"};
    }
    console.log(url);

    try {
        const response = await fetch(url, config);
        return await response.json();
    } catch (e) {
        console.error(e)
    }
}

const getRequest = async url => {
    const config = {
        method: "GET",
        credentials: "same-origin",
    };

    return await dataRequest(url, config);
};

const postRequest = async (url, body) => {
    const config = {
        method: "POST",
        credentials: "same-origin",
    };

    return await dataRequest(url, config, body)
}

const putRequest = async (url, body) => {
    const config = {
        method: "PUT",
        credentials: "same-origin",
    }

    return await dataRequest(url, config, body)
}

const deleteRequest = async url => {
    const config = {
        method: "DELETE",
        credentials: "same-origin",
    }

    return await dataRequest(url, config, body);
}

function getStatuses () {
    return getRequest(API_PATHS.GET_STATUSES);
}

function getTaskList () {
    return getRequest(API_PATHS.GET_TASK_LIST);
}

async function postTask (task) {
    const response = await postRequest(API_PATHS.POST_TASK, task);
    if (!response.ok) {
        return console.log("Failed to post task: " + task.title);
    };
    return console.log("Successfully posted task: " + task.title);
}

async function updateTask (id, status) {
    const url = `${API_PATHS.PUT_TASK}/${id}`
    const response = await putRequest(url, status);
    if (!response.ok) {
        return console.log("Failed to update task: " + id)
    }
    return console.log("Successfully updated task " + id + " with status " + status.status);
}

async function deleteTask (id)  {
    const url = `${API_PATHS.DELTE_TASK}/${id}`
    const response = await deleteRequest(url, status);
    if (!response.ok) {
        return console.log("Failed to delete task: " + id)
    }
    return console.log("Successfully delete task " + id);
}


var taskList = document.getElementById("taskList");
var modal = document.getElementById("modal");
var newTask = document.getElementById("newTask");
var addTask = document.getElementById("addTask");
var updateTask = document.getElementById("updateTask");
var close = document.getElementById("close");
var title = document.getElementById("title");
var option = document.getElementById("status");

function taskAdder(task) {
    let tr = document.createElement('tr');
    const tdTitle = document.createElement('td');
    const tdStatus = document.createElement('td');
    const tdModify = document.createElement('td');
    const tdRemove = document.createElement('td');  

    tdTitle.appendChild(document.createTextNode(task.id));
    tdStatus.appendChild(document.createTextNode(task.title));  

    tdModify.setAttribute("class", "modifyTask")
    tdRemove.setAttribute("class", "removeTask"); 

    tdModify.innerHTML = '<button>Modify</button>';
    tdRemove.innerHTML = '<button>Remove</button>'; 

    tr.appendChild(tdTitle);
    tr.appendChild(tdStatus);
    tr.appendChild(tdModify);
    tr.appendChild(tdRemove); 

    taskList.appendChild(tr);
}

// Get tasks
window.addEventListener('load', (e) => {

  const tasks = getStatuses();
  console.log(tasks);
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => {
    data.forEach(task => {
      var tr = document.createElement('tr');
      const tdTitle = document.createElement('td');
      const tdStatus = document.createElement('td');
      const tdModify = document.createElement('td');
      const tdRemove = document.createElement('td');

      tdTitle.appendChild(document.createTextNode(task.id));
      tdStatus.appendChild(document.createTextNode(task.title));

      tdModify.setAttribute("class", "modifyTask")
      tdRemove.setAttribute("class", "removeTask");
    
      tdModify.innerHTML = '<button>Modify</button>';
      tdRemove.innerHTML = '<button>Remove</button>';

      tr.appendChild(tdTitle);
      tr.appendChild(tdStatus);
      tr.appendChild(tdModify);
      tr.appendChild(tdRemove);

      taskList.appendChild(tr);
    });
  })
   
});

// Open modal
newTask.onclick = function() {
  addTask.style.display = "block";
  updateTask.style.display = "none";
  modal.style.display = "block";
}

// Close modal
close.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Add task
addTask.onclick = function(e) {

  var status = option.options[option.selectedIndex].text;

  if (title.value === '') {
    return alert('Add title');
  }

  if (status === '') {
    return alert('Add status');
  }

  const tr = document.createElement('tr');
  const tdTitle = document.createElement('td');
  const tdStatus = document.createElement('td');
  const tdModify = document.createElement('td');
  const tdRemove = document.createElement('td');

  tdTitle.appendChild(document.createTextNode(title.value));
  tdStatus.appendChild(document.createTextNode(status));

  tdModify.setAttribute("class", "modifyTask")
  tdRemove.setAttribute("class", "removeTask");

  tdModify.innerHTML = '<button>Modify</button>';
  tdRemove.innerHTML = '<button>Remove</button>';

  tr.appendChild(tdTitle);
  tr.appendChild(tdStatus);
  tr.appendChild(tdModify);
  tr.appendChild(tdRemove);

  // Append li to ul
  taskList.appendChild(tr);

  // Clear input
  title.value = '';
  status = '';

  modal.style.display = "none";

  e.preventDefault();
}

// Remove Task
loadRemoveTask();

function loadRemoveTask() {
  taskList.addEventListener('click', removeTask);
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('removeTask')) {
      if (confirm('Are You Sure?')) {
          e.target.parentElement.parentElement.remove();
      }
  }
}

// Modify Task
loadModifyTask();

function loadModifyTask() {
  taskList.addEventListener('click', modifyTask);
}

function modifyTask(e) {
  if (e.target.parentElement.classList.contains('modifyTask')) {
    var tr = e.target.parentElement.parentElement;
    var taskTitle = tr.getElementsByTagName("td")[0].textContent;
    var taskStatus = tr.getElementsByTagName("td")[1].textContent;
    addTask.style.display = "none";
    updateTask.style.display = "block";
    modal.style.display = "block";
    title.value = taskTitle;
    option.options[option.selectedIndex].text = taskStatus;
    /* option.options[option.selectedIndex] = taskStatus; */
    
    loadUpdateTask();
    function loadUpdateTask() {
      updateTask.addEventListener('click', submitChange);
    }

    function submitChange(event) {
      tr.getElementsByTagName("td")[0].innerText = title.value;
      tr.getElementsByTagName("td")[1].innerText = option.options[option.selectedIndex].value;
      modal.style.display = "none";
      event.preventDefault();
    }
  }
  e.preventDefault();
}