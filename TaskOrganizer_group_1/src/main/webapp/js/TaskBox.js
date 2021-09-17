class TaskBox extends HTMLElement {
	
	constructor() {
		super();
		this.shadow = this.attachShadow({mode: 'closed'});
		this._createHTML();
		
		const bt = this.shadow.querySelector('button[type=button]');
		bt.addEventListener('click', this._modal.bind(this));
	}
	
	_createHTML() {
		const content = `
			<button type="button" id="btn">New Task</button>
			
			<!-- The Modal -->
			<div id="myModal" class="modal">
			
			  <!-- Modal content -->
			  <div class="modal-content">
			    <span class="close">&times;</span>
			    <p>Some text in the Modal..</p>
			  </div>
			
			</div>
        `;
		const wrapper = document.createElement('div');
		wrapper.insertAdjacentHTML('beforeend', content);
		this.shadow.appendChild(wrapper);
		return wrapper;
	}
	
	_modal() {
		// Get the modal
		var modal = document.getElementById("myModal");
		
		// Get the button that opens the modal
		var btn = document.getElementById("btn");
		
		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];
		
		// When the user clicks on the button, open the modal
		btn.onclick = function() {
		  modal.style.display = "block";
		}
		
		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		  modal.style.display = "none";
		}
		
		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		  if (event.target == modal) {
		    modal.style.display = "none";
		  }
		}
		
	}
}
customElements.define('task-box', TaskBox);