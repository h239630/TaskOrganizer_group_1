class TaskBox extends HTMLElement {
	
	constructor() {
		super();
		this.shadow = this.attachShadow({mode: 'closed'});
		this._createStyle();
		this._createHTML();
		
		const bt = this.shadow.querySelector('#newTask');
		bt.addEventListener('click', this._modal.bind(this));
	}
	
	_createHTML() {
		const content = `
		
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
                                <button type="submit" value="Submit" id="addTask">Add task</button>
                            </form>
                        </div>
                    </div>
                
        `;
		const wrapper = document.createElement('div');
		wrapper.insertAdjacentHTML('beforeend', content);
		this.shadow.appendChild(wrapper);
		return wrapper;
	}
	
	_createStyle() {
		
		const style = 
		`.modal {
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
			} `;
			const styleElement = document.createElement('style');
			styleElement.insertAdjacentHTML('beforeend', style);
			this.shadow.appendChild(styleElement);
			return styleElement; 
		
	}
	
	_modal() {
		  
		
		var modal = this.shadow.querySelector('#modal');
		var newTask = this.shadow.getElementById("newTask");
		var addTask = this.shadow.getElementById("addTask");
		/* var removeTask = document.querySelectorAll("#removeTask"); */
		var close = this.shadow.getElementById("close");
		var title = this.shadow.getElementById("title");
		var option = this.shadow.getElementById("status");
		
		// Open modal
				
		newTask.onclick = function() {
		console.log(modal.style.display);
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
		
		 e.preventDefault();
		}
		
		
	}
}

customElements.define('task-box', TaskBox);

