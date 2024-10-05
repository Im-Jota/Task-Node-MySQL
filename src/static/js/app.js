document.addEventListener('DOMContentLoaded', () => {
  const ul = loadComponents()
  loadTasks(ul);

  const formTask = document.getElementById('formTask');
  formTask.addEventListener('submit', (e) => {
    createTask(e, ul)
  })
})


function loadComponents(){
  const app = document.getElementById('app');

  const nav = document.createElement('nav');
  nav.innerHTML = `
  <span>Task - Nodejs - MySQL</span>
  `;
  nav.classList.add('nav');
  const container = document.createElement('div');
  container.innerHTML = `
  <form id="formTask">
    <input type="text" placeholder="Enter New Task" name="task">
    <button>Save</button>
  </form>
  `;
  container.classList.add('container');

  const ul = document.createElement('ul');
  ul.setAttribute('id', 'listTasks');
  container.appendChild(ul);

  app.appendChild(nav);
  app.appendChild(container)

  return ul;
};

async function loadTasks(ul) {
  const data = await fetch('/tasks')
                    .then(response => response.json())
                    .then(data => data);
  
  ul.innerText = '';

  data.forEach(data => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = data.name;

    const div = document.createElement('div');
    const btnEdit = document.createElement('a');
    btnEdit.innerText = 'Edit';
    const btnDelete = document.createElement('a');
    btnDelete.innerText = 'Delete';

    div.appendChild(btnEdit);
    div.appendChild(btnDelete);

    li.appendChild(span);
    li.appendChild(div)
    ul.appendChild(li);

    btnEdit.addEventListener('click', () => {
      editTask(data.id);
    })

    btnDelete.addEventListener('click', () => {
      deleteTask(data.id, ul);
    })
  })
}

function createTask(e, ul) {
  e.preventDefault();
  const { task } = e.target;
  fetch('/tasks', {
    method: 'POST',
    headers: {'Content-Type':'applications/json'},
    body: JSON.stringify({name:task.value})
  })
  .then(loadTasks(ul));

  task.value = '';
}

async function editTask (id) {
  const app = document.getElementById('app');
  const modal = document.createElement('div');

  const data = await fetch(`/tasks/${id}`)
               .then(response => response.json())
               .then(data => data);

  const form = document.createElement('form');
  form.innerHTML = `
  <input placeholder="update task" value="${data[0].name}" name="task">
  `;

  const div = document.createElement('div');
  div.innerHTML = `
  <a href="/tasks/${id}">Update</a>
  `;

  const cancel = document.createElement('a');
  cancel.innerText = 'Cancel';

  div.appendChild(cancel);
  form.appendChild(div);

  modal.classList.add('modal');
  modal.appendChild(form);
  app.appendChild(modal);

  cancel.addEventListener('click', () => {
    closeModal(app, modal);
  })

  modal.addEventListener('click', (e) => {
    if(e.target.className == 'modal') {
      closeModal(app, modal);
    }
  })
};

function closeModal (app, modal) {
  app.removeChild(modal);
}

function updateName(id) {

}

async function deleteTask(id, ul) {
  await fetch(`/tasks/${id}`, {
    method: 'DELETE'
  }).then(loadTasks(ul))
}
