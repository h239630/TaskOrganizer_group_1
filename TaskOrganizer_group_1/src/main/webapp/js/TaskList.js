/**
 * <p>Object with configurations. Currently, the only parameter is the URL of OrganizerServices.</p>
 *
 * @author Bjarte Kileng
 */
const config = {
    /**
     * <p>The top URL of the services of Mservices, relative to the application. The services will be:</p>
     * <ul>
     * <li>GET `${config.servicesPath}/updates/${loggId}`</li>
     * <li>DELETE `${config.servicesPath}/member/${memberId}`</li>
     * <li>POST `${config.servicesPath}/member/`</li>
     * <li>PUT `${config.servicesPath}/member/${memberId}`</li>
     * </ul>
     *
     * @readonly
     * @type {String}
     */
    servicesPath: '../TaskServices/api/services'
}

const basePath = () => `http://${window.location.host}/TaskServices/api/services`;

function aPathHandler (subpath) {
    return basePath + "/" + subpath;
}

const pathHandler = subPath => `${basePath()}/${subPath}`;

//While the last two paths are not exactly neccessary, they were added so that if these path locations were updated later, the methods need not be changed. Just the const.
const API_PATHS = {
    GET_STATUSES: pathHandler("allstatuses"),
    GET_TASK_LIST: pathHandler("tasklist"),
    POST_TASK: pathHandler("task"),
    PUT_TASK: pathHandler("task"),
    DELTE_TASK: pathHandler("task"),
}

const dataRequest = async (url, fetchConfig, body) => {
    if (body) {
        fetchConfig.body = JSON.stringify(body);
        fetchConfig.headers = {"Content-type": "application/json"};
    }

    try {
        const response = await fetch(url, fetchConfig);
		if (!response.ok) {
			console.log("Failed to fetch at: " + url);
		}
        return await response.json();
    } catch (e) {
        console.error(e)
    }
}

const getRequest = async url => {
    const fetchConfig = {
        method: "GET",
    };

    return await dataRequest(url, fetchConfig);
};

const postRequest = async (url, body) => {
    const fetchConfig = {
        method: "POST",
    };

    return await dataRequest(url, fetchConfig, body)
}

const putRequest = async (url, body) => {
    const fetchConfig = {
        method: "PUT",
    }

    return await dataRequest(url, fetchConfig, body)
}

const deleteRequest = async url => {
    const fetchConfig = {
        method: "DELETE",
    }

    return await dataRequest(url, fetchConfig);
}

function getStatuses () {
    return getRequest(API_PATHS.GET_STATUSES);
}

function getTaskList () {
    return getRequest(API_PATHS.GET_TASK_LIST);
}

/** 
 * 
 * 
 * postTask trenger et objekt som ser slikt ut
{status: "WAITING", title: "Paint roof"}
*/

async function postTask (task) {
    await postRequest(API_PATHS.POST_TASK, task);

}

/**
 * Status is a object with a structure like this:
 * { status: "STATUS_ENUM_HERE" }
 */
async function updateTask (id, status) {
    const url = `${API_PATHS.PUT_TASK}/${id}`
    await putRequest(url, status);
    
}

async function deleteTask (id)  {
    const url = `${API_PATHS.DELTE_TASK}/${id}`
    await deleteRequest(url, status);
}

//All the server statuses gets saved here.
let statuses;

window.modifyTask = {};
window.deleteTaskById = {};
window.fetchTasks = () => null;

function taskAdder(task, taskList) {
    let tr = document.createElement('tr');
    const tdTitle = document.createElement('td');
    const tdStatus = document.createElement('td');
    const tdModify = document.createElement('td');
    const tdRemove = document.createElement('td');  

    tdTitle.appendChild(document.createTextNode(task.id));
    tdStatus.appendChild(document.createTextNode(task.title));  

    tdModify.setAttribute("class", "modifyTask")
    tdRemove.setAttribute("class", "removeTask"); 

	window.modifyTask[task.id] = () => {
		/**
		 * write modify functionality here. 
		 * Åpne en modal med de forskjellige statusene, bruk updateTask
		 * 
		 * 
		 * Denne går på slutten av modify og new task. Den tømmer listen og oppdater fra databasen
		 * window.fetchTasks();
		 * */
		 window.fetchTasks();
	}

	window.deleteTaskById[task.id] = async () => {
		await deleteTask(task.id);
		window.fetchTasks();
	}

    tdModify.innerHTML = `<button onClick="window.modifyTask[${task.id}]()">Modify</button>`;
    tdRemove.innerHTML = `<button onClick="window.deleteTaskById[${task.id}]()">Remove</button>`; 

    tr.appendChild(tdTitle);
    tr.appendChild(tdStatus);
    tr.appendChild(tdModify);
    tr.appendChild(tdRemove); 

    taskList.appendChild(tr);
}


class TaskList extends HTMLElement {

	constructor() {
		
		super();

		this.shadow = this.attachShadow({ mode: 'closed' });
		this._createStyle();
		this._createHTML();
		
		const bt = this.shadow.querySelector('#newTask');
		bt.addEventListener('click', this._modal.bind(this));
	}
	
	_createStyle() {
		const style = `
		.modal {
			  display: none; /* Hidden by default */
			  position: fixed; /* Stay in place */
			  z-index: 1; /* Sit on top */
			  padding-top: 100px; /* Location of the box */
			  left: 0;
			  top: 0;
			  width: 100%; /* Full width */
			  height: 100%; /* Full height */
			  overflow: auto; /* Enable scroll if needed */
			  background-color: rgb(0,0,0); /* Fallback color */
			  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
			}
			
			/* Modal Content */
			.modal-content {
			  background-color: #fefefe;
			  margin: auto;
			  padding: 20px;
			  border: 1px solid #888;
			  width: 80%;
			}
			
			/* The Close Button */
			.close {
			  color: #aaaaaa;
			  float: right;
			  font-size: 28px;
			  font-weight: bold;
			}
			
			.close:hover,
			.close:focus {
			  color: #000;
			  text-decoration: none;
			  cursor: pointer;
			}`;
			const styleElement = document.createElement('style');
			styleElement.insertAdjacentHTML('beforeend', style);
			this.shadow.appendChild(styleElement);
			return styleElement;
					
		
	}
	_createHTML() {
		const content = `
        <div class="container w3-container">
            <div class="row">
                <div class="col-12">
                    <h1>Tasks</h1>
                    <p>Found 4 tasks</p>

                    <!-- Trigger/Open The Modal -->
                    <button id="newTask">New task</button>
                    <!-- The Modal -->
                    <div id="modal" class="modal">
                        <!-- Modal content -->
                        <div class="modal-content">
                            <span id="close">&times;</span>

                            <form class="w3-form">
                                <label for="title">Title:</label>
                                <input type="text" id="title" name="title"><br><br>
                                <label for="status">Status</label>
                                <select name="status" id="status">
                                    <option value="active">Active</option>
                                    <option value="done">Done</option>
                                    <option value="waiting">Waiting</option>
                                </select>
                                <br><br>
                                <button type="submit" value="SubmitAdd" id="addTask">Add task</button>
                                <button type="submit" value="SubmitUpdate" id="updateTask">Update task</button>
                            </form>
                        </div>
                    </div>

                    <table class="w3-table">
                        <tbody id="taskList">
                            <tr>
                                <th>Task</th>
                                <th>Status</th>
                                <th>Modify</th>
                                <th>Remove</th>
                            </tr>
                            <tr>
                                <td>task 1</td>
                                <td>Active</td>
                                <td class="modifyTask"><button>Modify</button></td>
                                <td class="removeTask"><button>Remove</button></td>
                            </tr>
                            <tr>
                                <td>task 2</td>
                                <td>Done</td>
                                <td class="modifyTask"><button>Modify</button></td>
                                <td class="removeTask"><button>Remove</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    

        `;

		window.fetchTasks = async () => {
			const response = await getTaskList();
			var taskList = this.shadow.getElementById("taskList");
			taskList.innerHTML = "";
			response.tasks.forEach(task => taskAdder(task, taskList));
		}


		window.onload = async (e) => {
			statuses = await getStatuses();
			window.fetchTasks();

			/**
			 * fetch(`${config.servicesPath}/tasklist`,{method: "GET"})
			.then(reponse => reponse.json())
			 .then(data => {
			      data.tasks.forEach(task => {
				 var taskList = this.shadow.getElementById("taskList");
			      var tr = document.createElement('tr');
			      const tdTitle = document.createElement('td');
			      const tdStatus = document.createElement('td');
			      const tdModify = document.createElement('td');
			      const tdRemove = document.createElement('td');
			
			      tdTitle.appendChild(document.createTextNode(task.title));
			      tdStatus.appendChild(document.createTextNode(task.status));
			
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
			 */
		};
		const wrapper = document.createElement('div');
		wrapper.insertAdjacentHTML('beforeend', content);
		this.shadow.appendChild(wrapper);
		return wrapper;
	}
	
	_modal() {
		
		var modal = this.shadow.getElementById("modal");
		var newTask = this.shadow.getElementById("newTask");
		var addTask = this.shadow.getElementById("addTask");
		var updateTask = this.shadow.getElementById("updateTask");
		/* var removeTask = document.getElementById("removeTask"); */
		/* var removeTask = document.querySelectorAll("#removeTask"); */
		var close = this.shadow.getElementById("close");
		var title = this.shadow.getElementById("title");
		var option = this.shadow.getElementById("status");
		
		
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
	}
	
	

}



customElements.define('task-list', TaskList);	