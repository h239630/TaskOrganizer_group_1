var taskList = document.getElementById("taskList");
var modal = document.getElementById("modal");
var newTask = document.getElementById("newTask");
var addTask = document.getElementById("addTask");
var updateTask = document.getElementById("updateTask");
/* var removeTask = document.getElementById("removeTask"); */
/* var removeTask = document.querySelectorAll("#removeTask"); */
var close = document.getElementById("close");
var title = document.getElementById("title");
var option = document.getElementById("status");

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