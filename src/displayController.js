import createProject from './projects';
import createTodo from './todo';

let projectsElement = document.getElementById('projects-bar');

let projects = [];
let todos = [];

const createProjectButton = (id) => {
  let projectButton = document.createElement('a');
  projectButton.setAttribute('id', id);
  projectButton.innerText = id;
  projectButton.classList.add('project-button');
  projectButton.classList.add('project');
  insertEditButtonTo(projectButton);
  insertDeleteButtonTo(projectButton);
  projectButton.addEventListener('click', handleProject, true);
  return projectButton;
}

const changeTextToEditable = (parent, e = null) => {
  let textEdit = document.createElement('input');
  textEdit.setAttribute('type','text');
  textEdit.setAttribute('placeholder', parent.innerText);

  textEdit.addEventListener('blur', saveTextEdit, true);
  textEdit.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
      textEdit.blur();
    }
  })
  parent.replaceChild(textEdit, parent.firstChild);
  textEdit.focus();
}

const changeEditableToText = (parent, text) => {
  parent.replaceChild(
    document.createTextNode(text),
    parent.firstChild
  );
}

const insertDeleteButtonTo = (button) => {
  button.insertAdjacentHTML('beforeend',
    `<svg class="svg-icon delete" viewBox="0 0 20 20" pointer-events="all">
    <path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
    <rect width="100%" height="100%" fill="none" />
    </svg>`
  );
}

const insertEditButtonTo = (button) => {
  button.insertAdjacentHTML('beforeend',
  `<svg class="svg-icon edit" viewBox="0 0 20 20" pointer-events="all">
    <path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"></path>
    <rect width="100%" height="100%" fill="none" />
    </svg>`
  );
}

const createNewProjectButton = () => {
  let newProjectButton = document.createElement('a');
  newProjectButton.setAttribute('id','new-project-button');
  newProjectButton.innerText = 'Add new project';
  newProjectButton.classList.add('project-button');
  newProjectButton.classList.add('new-project');
  
  newProjectButton.addEventListener('click',(e) => {
    changeTextToEditable(newProjectButton, e);
  }, true);
    
  projectsElement.appendChild(newProjectButton);
}

const initializeEventsForStaticElements = () => {
  let todayButton = document.getElementById('today');
  let allButton = document.getElementById('all');
  let scheduledButton = document.getElementById('scheduled');

  allButton.addEventListener('click', () => {
    let sectionElement = document.getElementById('project-section');
    sectionElement.innerHTML = ''; // reset for display

    for(let project of projects) {
      console.log(project.getTitle());
      loadProject(project.getTitle());
    }
  });
}

export default function initializeDisplay() {
  createNewProjectButton(); // appends a new project button at the end
  initializeEventsForStaticElements();
}

const handleProject = (e) => {
  switch(true) {
    case e.target.classList.contains('project-button'):
      let sectionElement = document.getElementById('project-section');
      sectionElement.innerHTML = ''; // reset for display
      loadProject(e.target.id);
      break;
    case e.target.classList.contains('delete'):
      deleteProject(e);
      break;
    case e.target.classList.contains('edit'):
      editProject(e);
      break;
  }
}

const findProject = (title) => {
  return projects.find(
      (project) => { return project.getTitle() == title }
  );
}

const loadProject = (projectName) => {
  let project = findProject(projectName);

  let sectionElement = document.getElementById('project-section');
  let projectContainer = document.createElement('div');
  let projectTitleElement = document.createElement('h3');
  let projectDescElement = document.createElement('h2');
  let todoListElement = document.createElement('div');

  projectContainer.classList.add('project-container');
  projectTitleElement.innerText = project.getTitle();
  projectDescElement.innerText = project.getDescription();
  todoListElement.classList.add('todo-list');
    
  projectContainer.appendChild(projectTitleElement);
  projectContainer.appendChild(projectDescElement);
  projectContainer.appendChild(todoListElement);
    
  sectionElement.appendChild(projectContainer);

  clearTodos(todoListElement);
  loadTodos(project, todoListElement)
}

const editProject = (e) => {
  let projectButton = e.target.parentElement;

  changeTextToEditable(projectButton);
}

const saveTextEdit = (e) => {
  let inputBox = e.target;
  let button = e.target.parentElement;
  let todoListElement = e.target.parentElement.parentElement;
  let container = e.target.parentElement.parentElement.parentElement;
  let project;
  switch (true) {
    case button.classList.contains('project'):
      project = findProject(button.id);
      let oldProjectName = project.getTitle();
      project.setTitle(e.target.value);
      linkTodosToNewProject(oldProjectName, project)
      button.id = project.getTitle();
      changeEditableToText(button, project.getTitle());
      break;
    
    case button.classList.contains('todo'):
      break;
    
    case button.classList.contains('new-project'):
      changeEditableToText(button, inputBox.value);
      project = createProject(inputBox.value);
      projects.push(project);
      projectsElement.appendChild(createProjectButton(project.getTitle()));
      button.remove(); // destroy old new project button
      createNewProjectButton(); // create new one
      break;
    
    case button.classList.contains('new-todo'):
      project = findProject(container.firstChild.innerText);
      let todo = createTodo(inputBox.value, project);
      todos.push(todo);
      todoListElement.appendChild(createTodoButton(todo.getTitle()));
      button.remove();
      createNewTodoButton(todoListElement);
      break;
  }
}

const deleteProject = (e) => {
  let project = findProject(e.target.parentElement.id);
  projects.splice(projects.indexOf(findProject(e.target.parentElement.id),1));
  disposeTodos(project);
  e.target.parentElement.remove();
}

const createTodoButton = (id) => {
  let todoButton = document.createElement('a');
  todoButton.setAttribute('id', id);
  todoButton.innerText = id;
  todoButton.classList.add('todo-button');
  todoButton.classList.add('todo');
  insertEditButtonTo(todoButton);
  insertDeleteButtonTo(todoButton);
  todoButton.addEventListener('click', handleTodo, true);
  return todoButton;
}

const createNewTodoButton = (todoListElement) => {
  let newTodoButton = document.createElement('a');
  newTodoButton.setAttribute('id','new-todo-button');
  newTodoButton.innerText = 'Add new task';
  newTodoButton.classList.add('todo-button');
  newTodoButton.classList.add('new-todo');

  newTodoButton.addEventListener('click',(e) => {
    changeTextToEditable(newTodoButton, e);
  }, true);

  todoListElement.appendChild(newTodoButton);
}

const clearTodos = (todoListElement) => {
  todoListElement.innerHTML = ''; // clear all
}

const loadTodos = (project, todoListElement) => {
  let projectTodos = project.getMyTodos(todos);
  for(let todo of projectTodos) {
    let todoButton = createTodoButton(todo.getTitle());
    if(todo.isDone()) todoButton.classList.add('done');
    todoListElement.appendChild(todoButton);
  }

  createNewTodoButton(todoListElement);
}

const handleTodo = (e) => {
  switch(true) {
    case e.target.classList.contains('todo-button'):
      toggleTodo(e);
      break;
    case e.target.classList.contains('delete'):
      deleteTodo(e);
      break;
    case e.target.classList.contains('edit'):
      editTodo(e);
      break;
  }
}

const editTodo = (e) => {
  console.log('EDITING START');
}

const deleteTodo = (e) => {
  let projectName = e.target.parentElement.parentElement.parentElement.firstElementChild.innerText;
  let todoTitle = e.target.parentElement.id;
  todos.splice(findTodoIndex(todoTitle, projectName), 1);
  e.target.parentElement.remove();
}

const findTodoIndex = (todoTitle, projectName) => {
  return todos.findIndex(
    (todo) => { return todo.getTitle() == todoTitle && todo.getProject() == projectName; }
  )
}

const findTodo = (todoTitle, projectName) => {
  return todos.find(
    (todo) => { 
      return todo.getTitle() == todoTitle && todo.getProject().getTitle() == projectName; 
    }
  )
}

const toggleTodo = (e) => {
  let todoTitle = e.target.id;
  let projectName = e.target.parentElement.parentElement.firstElementChild.innerText;
  let todo = findTodo(todoTitle, projectName);

  todo.toggleTask() ? e.target.classList.add('done') : e.target.classList.remove('done');
}

const linkTodosToNewProject = (oldProjectName, project) => {
  for(let todo of todos) {
    if(todo.getProject().getTitle() == oldProjectName) {
      todo.setProject(project);
    }
  }
}

const disposeTodos = (project) => {
  let todosCount = todos.length;
  while(todosCount--) {
    if(todos[todosCount].getProject().getTitle() == project.getTitle()) {
      todos.splice(todosCount, 1);
    }
  }
}