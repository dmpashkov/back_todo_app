document.addEventListener('DOMContentLoaded', async () => {
	let tasks = [];
	const input = document.querySelector('.todo__input');
	const button = document.querySelector('.todo-btn');
	const btnRem = document.querySelector('.todo-btn:last-child');

	renderTask = async () => {
		const resp = await fetch('http://localhost:8000/allTasks', {
			method: 'GET'
		});
		let result = await resp.json();
		tasks = result.data;
		tasks.sort((a, b) => a.isCheck > b.isCheck ? 1 : -1);
		const taskrend = document.querySelector('.todo__tasks');

		while (taskrend.firstChild) {
			taskrend.removeChild(taskrend.firstChild)
		}
		tasks.forEach((elem, index) => {
			const task = document.createElement('div');
			task.id = `${elem._id}`;
			task.classList.add('todo__task');
			const checkB = document.createElement("INPUT");
			checkB.setAttribute("type", "checkbox");
			checkB.checked = elem.isCheck;
			checkB.onchange = () => {
				onChangeCheckbox(elem);
			}
			if (elem.isCheck) {
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
			editImg.addEventListener("click", editTask);
			deltImg.addEventListener("click", deleteTask);

			task.appendChild(editImg);
			task.appendChild(deltImg);
			taskrend.appendChild(task);
			// localStorage.setItem('tasks', JSON.stringify(tasks));
		})
	}

	addTask = async (event) => {
		let value = '';
		value = event.target.value;
		tasks.unshift({
			text: value,
			isCheck: false
		})
		const resp = await fetch('http://localhost:8000/createTask', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				text: value,
				isCheck: false
			})
		});
		let result = await resp.json();
		tasks = result.data;
		value = "";
		event.target.value = '';
		// localStorage.setItem('tasks', JSON.stringify(tasks));
		renderTask();
	}

	onChangeCheckbox = async (task) => {
		const resp = await fetch('http://localhost:8000/updateTask', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Content-Length': 526
			},
			body: JSON.stringify({
				text: task.text,
				isCheck: !task.isCheck,
				id: task.id
			})
		});
		let result = await resp.json();
		tasks = result.data;
		// localStorage.setItem('tasks', JSON.stringify(tasks));
		renderTask();
	}
	editTask = async (event) => {
		const elemid = event.target.parentNode.id;
		console.log(event.target.parentNode.id);
		if (!event.target.parentNode.isCheck) {
			const edit = prompt('Введите новый текст', '');
			// if (edit) {
			// 	event.text = edit;
			// }
			console.log('1');
			const resp = await fetch('http://localhost:8000/updateTask', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify({
					"text": edit,
					"_id": event.target.parentNode.id,
					"isCheck": false
				})
			});
			let result = await resp.json();
			tasks = result.data;
			// localStorage.setItem('tasks', JSON.stringify(tasks));
			console.log('2');
			renderTask();
		}
	}

	deleteTask = async (event) => {
		const elemId = event.target.parentNode.id;
		const resp = await fetch(`http://localhost:8000/deleteTask?_id=${elemId}`, {
			method: 'DELETE'
		});
		await resp.json();
		// localStorage.setItem('tasks', JSON.stringify(tasks));
		renderTask();
	}

	deleteAllTask = async () => {
		tasks.forEach(async elem => {
			const resp = await fetch(`http://localhost:8000/deleteTask?id=${elem.id}`, {
				method: 'DELETE'
			});
			// let result = await resp.json();
			tasks = [];
			// localStorage.setItem('tasks', JSON.stringify(tasks));
			renderTask();
		})
	}

	button.addEventListener("click", input.addTask);
	btnRem.addEventListener("click", deleteAllTask)
	input.addEventListener("change", addTask);

	renderTask(tasks);
});
