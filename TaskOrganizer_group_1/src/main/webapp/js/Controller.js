"use strict"

// Skallet av en kontroller klasse, denne må fylles ut

enableaddtask()
{
	const tasklist = document.querySelector("task-list");
	tasklist.enableaddtask();
}

addtaskCallback()
{
	const tasklist = document.querySelector("task-list");
	tasklist.enableaddtask();
	tasklist.addtaskCallback(
		() => { 
			console.log("Click event on 'New task button'")
		});
}

changestatusCallback()
{
	const tasklist = document.querySelector("task-list");
	tasklist.changestatusCallback(
		(id, newStatus) => {
			console.log(`User chose ${newStatus} for task ${id}`)
		});
}

deletetaskCallback()
{
	const tasklist = document.querySelector("task-list");
	tasklist.deletetaskCallback(
		(id) => {
			console.log(`Click event on delete button of task ${id}`)
		});
}


noTask() 
{
	const tasklist = document.querySelector("task-list");
	tasklist.noTask();	
}

showTask() 
{
	const tasklist = document.querySelector("task-list");
	const newtask = {
	"id": 5,
	"title": "Do DAT152 home work",
	"status": "ACTIVE"
	};
	tasklist.showTask(newtask);
}

updateTask() 
{
	const tasklist = document.querySelector("task-list");
	const status = {
	"id": 1,
	"status": "ACTIVE"
	};
	tasklist.updateTask(status);
}

removeTask() 
{
	const tasklist = document.querySelector("task-list");
	tasklist.removeTask(1);	
}


