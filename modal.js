var taskList = document.getElementById("taskList");
var modal = document.getElementById("modal");
var newTask = document.getElementById("newTask");
var addTask = document.getElementById("addTask");
var removeTask = document.getElementById("removeTask");
/* var removeTask = document.querySelectorAll("#removeTask"); */
var close = document.getElementById("close");
var title = document.getElementById("title");
var option = document.getElementById("status");

// Open modal
newTask.onclick = function() {
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

  console.log(status);

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

  tdRemove.setAttribute("id", "removeTask");

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
removeTask.onclick = function(e) {
  console.log(e)
  if (confirm('Are You Sure?')) {
    e.target.parentElement.parentElement.remove();
  }
  /* if (e.target.parentElement.classList.contains('removeTask')) {
    if (confirm('Are You Sure?')) {
        e.target.parentElement.parentElement.remove();
    }
  } */
}

/* removeTask.addEventListener('click', deleteTask);

function deleteTask(e) {
  if (e.target.parentElement.classList.contains('removeTask')) {
      if (confirm('Are You Sure?')) {
          e.target.parentElement.parentElement.remove();
      }
  }
} */