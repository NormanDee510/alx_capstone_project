window.addEventListener('load', () => {
	tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	const nameInput = document.querySelector('#name');
	const newTaskForm = document.querySelector('#new-task-form');
	const searchInput = document.querySelector('#search');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newTaskForm.addEventListener('submit', e => {
		e.preventDefault();

		const task = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			dueDate: e.target.elements.date.value,
			done: false,
			createdDate: new Date()
		}
		if (!task.content.trim() || !task.category.trim() || !task.dueDate.trim()) {
			function showValidationErrorMessage() {
				var modal = document.getElementById("validationModal");
				modal.style.display = "block";
			}
			setTimeout(function () {
				closeValidationModal();
			}, 3000);
			showValidationErrorMessage();
			return;
		}

		tasks.push(task);

		localStorage.setItem('tasks', JSON.stringify(tasks));

		// Reset the form
		e.target.reset();

		DisplayTasks()
	})
	searchInput.addEventListener('input', () => {		
		DisplayTasks();
	});

	DisplayTasks()
})

function DisplayTasks() {
	const tasksList = document.querySelector('#task-list');
	const searchInput = document.querySelector('#search');
	const searchQuery = searchInput.value.toLowerCase();
	tasksList.innerHTML = "";	
	tasks.forEach(task => {
		if (task.content.toLowerCase().includes(searchQuery)) {
			const taskItem = document.createElement('div');
			taskItem.classList.add('task-item');

			const label = document.createElement('label');
			const input = document.createElement('input');
			const span = document.createElement('span');
			const content = document.createElement('div');
			const actions = document.createElement('div');
			const edit = document.createElement('button');
			const deleteButton = document.createElement('button');
			const search = document.createElement('search');

			input.type = 'checkbox';
			input.checked = task.done;
			span.classList.add('bubble');
			if (task.category == 'personal') {
				span.classList.add('personal');
			} else {
				span.classList.add('business');
			}
			content.classList.add('task-content');
			actions.classList.add('actions');
			edit.classList.add('edit');
			deleteButton.classList.add('delete');
			search.classList.add('search');

			content.innerHTML = `<input type="text" value="${task.content}" readonly>`;
			edit.innerHTML = 'Edit';
			deleteButton.innerHTML = 'Delete';			

			label.appendChild(input);
			label.appendChild(span);
			actions.appendChild(edit);
			actions.appendChild(deleteButton);
			actions.appendChild(search);
			taskItem.appendChild(label);
			taskItem.appendChild(content);
			taskItem.appendChild(actions);

			tasksList.appendChild(taskItem);

			if (task.done) {
				taskItem.classList.add('done');
			}

			input.addEventListener('change', (e) => {
				task.done = e.target.checked;
				localStorage.setItem('tasks', JSON.stringify(tasks));

				if (task.done) {
					taskItem.classList.add('done');
					function showCompletionMessage() {
						var modal = document.getElementById("completionModal");
						modal.style.display = "block";
					}
					setTimeout(function () {
						closeModal();
					}, 3000);
					showCompletionMessage();
				} else {
					taskItem.classList.remove('done');
				}

				DisplayTasks()

			})

			edit.addEventListener('click', (e) => {
				const input = content.querySelector('input');
				input.removeAttribute('readonly');
				input.focus();
				input.addEventListener('blur', (e) => {
					input.setAttribute('readonly', true);
					task.content = e.target.value;
					localStorage.setItem('tasks', JSON.stringify(tasks));
					DisplayTasks()

				})
			})

			deleteButton.addEventListener('click', (e) => {
				tasks = tasks.filter(t => t != task);
				localStorage.setItem('tasks', JSON.stringify(tasks));
				DisplayTasks()
			})
		}
	})
}

function closeModal() {
	var modal = document.getElementById("completionModal");
	modal.style.display = "none";
}

function closeValidationModal() {
	var modal = document.getElementById("validationModal");
	modal.style.display = "none";
}

