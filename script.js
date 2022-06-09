// let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let tasks = [];

document.addEventListener('DOMContentLoaded', async () => {
	const input = document.querySelector('.todo__input');
	const button = document.querySelector('.todo-btn');
	const btnRem = document.querySelector('.todo-btn:last-child');

	button.addEventListener("click", input.addTask);
	btnRem.addEventListener("click", deleteTask)
	input.addEventListener("change", addTask);
	const resp = await fetch('http://localhost:8000/allTasks', {
		method: 'GET'
	});
	let result = await resp.json();
	tasks = result.data;
	renderTask();
});

renderTask = () => {
	const taskrend = document.querySelector('.todo__tasks');

	while (taskrend.firstChild) {
		taskrend.removeChild(taskrend.firstChild)
	}
	tasks.forEach((elem, index) => {
		const task = document.createElement('div');
		task.id = `${elem.id}`;
		task.classList.add('todo__task');
		const checkB = document.createElement("INPUT");
		checkB.setAttribute("type", "checkbox");
		checkB.checked = elem.isComplete;
		checkB.onchange = () => {
			onChangeCheckbox(index);
		}
		if (elem.isComplete) {
			task.classList.toggle("todo__task_complete");
		}
		const text = document.createElement('div');
		text.innerText = elem.text;
		task.appendChild(checkB);
		task.appendChild(text)

		const editImg = document.createElement('img');
		const deltImg = document.createElement('img');
		editImg.src = 'icons/pencil.png';
		deltImg.src = 'icons/remove.png';
		editImg.onclick = () => {
			editTask(elem);
		}
		deltImg.onclick = () => {
			deleteTask(elem.id);
		}
		task.appendChild(editImg);
		task.appendChild(deltImg);
		taskrend.appendChild(task);
		localStorage.setItem('tasks', JSON.stringify(tasks));
	})
	console.log(tasks);
}

addTask = async (event) => {
	let value = '';
	value = event.target.value;
	tasks.unshift({
		text: value,
		isComplete: false
	})
	const resp = await fetch('http://localhost:8000/createTask', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'Access-Control-Allow-Origin': '*'
		},
		body: JSON.stringify({
			text: value,
			isCheck: false
		})
	});
	let result = await resp.json();
	tasks = result.data;
	localStorage.setItem('tasks', JSON.stringify(tasks));
	value = "";
	event.target.value = '';
	renderTask();
}

onChangeCheckbox = (index) => {
	const temp = tasks[index];

	if (tasks[index].isComplete) {
		tasks[index].isComplete = !tasks[index].isComplete;
		tasks.splice(index, 1);
		tasks.unshift(temp);
	} else {
		tasks[index].isComplete = !tasks[index].isComplete;
		tasks.splice(index, 1);
		tasks.push(temp);
	}
	localStorage.setItem('tasks', JSON.stringify(tasks));
	renderTask();
}
editTask = async (task) => {
	console.log(task);
	console.log(task.isCheck);
	if (!task.isCheck) {
		const edit = prompt('Введите новый текст', '');
		if (edit) {
			tasks[task].text = edit;
		}
		const resp = await fetch('http://localhost:8000/createTask', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'Access-Control-Allow-Origin': '*'
		},
		body: JSON.stringify({
			text: edit,
			isCheck: false,
			id: task 
		})
	});
	let result = await resp.json();
		localStorage.setItem('tasks', JSON.stringify(tasks));
		renderTask();
	}
}
deleteTask = async (event) => {
	if (typeof event === 'object') {
		tasks.forEach(async elem => {
			const resp = await fetch(`http://localhost:8000/deleteTask?id=${elem.id}`, {
				method: 'DELETE'
			});
			let result = await resp.json();
			tasks = result.data;
			renderTask();
		})
	} else {
		const resp = await fetch(`http://localhost:8000/deleteTask?id=${event}`, {
			method: 'DELETE'
		});
		let result = await resp.json();
		tasks = result.data;
		localStorage.setItem('tasks', JSON.stringify(tasks));
		renderTask();
	}
}
