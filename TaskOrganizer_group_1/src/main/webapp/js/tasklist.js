class TaskList extends HTMLElement {

	constructor() {
		
		super();

		this.shadow = this.attachShadow({ mode: 'open' });
		this._createStyle();
		this._createHTML();
		
		const bt = this.shadow.querySelector('button[type=button]');
		bt.addEventListener('click', this._sayHello.bind(this));
	}
	
	_createStyle() {
		const style = `
            p {
                color: blue;
        	}`;
		const styleElement = document.createElement('style');
		styleElement.insertAdjacentHTML('beforeend', style);
		this.shadow.appendChild(styleElement);
		return styleElement;
	}
	
	_createHTML() {
		const content = `
            <p>
                Task List
            </p>

            <button type="button" id="btn">New Task</button>
        `;
		const wrapper = document.createElement('div');
		wrapper.insertAdjacentHTML('beforeend', content);
		this.shadow.appendChild(wrapper);
		return wrapper;
	}
	
	_sayHello() {
		

		alert(`Test`);
	}
	
	
	_addtaskCallback() {
		const tasklist = document.querySelector("task-list");
		tasklist.enableaddtask();
		tasklist.addtaskCallback(
			() => {Console.log("Click event on 'New task button'")}
		);
	}
	
	_changestatusCallback() {
		const tasklist = document.querySelector("task-list");
		tasklist.changestatus
	}
	
	
}
customElements.define('task-list', TaskList);	