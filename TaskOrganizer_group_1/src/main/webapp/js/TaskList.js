class TaskList extends HTMLElement {

	constructor() {
		
		super();

		this.shadow = this.attachShadow({ mode: 'closed' });
		//this._createStyle();
		this._createHTML();
		
		const bt = this.shadow.querySelector('button[type=button]');
		bt.addEventListener('click', this._sayHello.bind(this));
	}
	
	/*() {
		const style;
		const styleElement = document.createElement('style');
		styleElement.insertAdjacentHTML('beforeend', style);
		this.shadow.appendChild(styleElement);
		return styleElement;
	}*/
	
	_createHTML() {
		const content = `
            <p>
                Task List
            </p>

        `;
		const wrapper = document.createElement('div');
		wrapper.insertAdjacentHTML('beforeend', content);
		this.shadow.appendChild(wrapper);
		return wrapper;
	}
	
}
customElements.define('task-list', TaskList);	