document.addEventListener('DOMContentLoaded', () => {
  const ul = loadComponents()
  loadTasks(ul);
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
  <form>
    <input type="text" placeholder="Enter New Task">
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
  data.forEach((data) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <span>${data.name}</span>
    <div class="li_div__buttons">
      <a>Edit</a>
      <a>Delete</a>
    </div>
    `;
    ul.appendChild(li);
  })
}
