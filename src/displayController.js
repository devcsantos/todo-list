import createProject from './projects';
import createTodo from './todo';

let projectsElement = document.getElementById('projects-bar');
let todoListElement = document.getElementById('todo-list');

let projects = [];

const createProjectButton = (id) => {
  let projectButton = document.createElement('a');
  projectButton.setAttribute('id', id);
  projectButton.innerText = id;
  projectButton.classList.add('project-button');
  projectButton.classList.add('project');
  insertDeleteButtonTo(projectButton);
  insertEditButtonTo(projectButton);
  projectButton.addEventListener('click', (handleProject), true);
  return projectButton;
}

const changeTextToEditable = (parent) => {
  let textEdit = document.createElement('input');
  textEdit.setAttribute('type','text');
  textEdit.setAttribute('placeholder', parent.innerText);

  textEdit.addEventListener('blur', saveTextEdit);
  parent.replaceChild(textEdit, parent.firstChild);
  textEdit.focus();
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
  
  newProjectButton.addEventListener('click',(e) => {
    let textEdit = document.createElement('input');
    textEdit.setAttribute('type','text');
    textEdit.setAttribute('placeholder', newProjectButton.innerText);
    newProjectButton.replaceChild(textEdit, newProjectButton.firstChild);
    textEdit.focus();
  }, true);
  
  newProjectButton.addEventListener('addProject', (e) => {
    let project = createProject(e.detail.id, 'New project description');
    projects.push(project);
    projectsElement.appendChild(createProjectButton(project.getTitle()));
    newProjectButton.remove();
    createNewProjectButton();
  }, true)
  
  newProjectButton.addEventListener('blur', (e) => {
    let textEdit = newProjectButton.firstChild;
    newProjectButton.innerText = textEdit.value;
    textEdit.remove();
    newProjectButton.dispatchEvent(new CustomEvent(
      'addProject',
      {
        detail: {
          id: newProjectButton.innerText
        }
      }
      ));
    }, true);
    
    projectsElement.appendChild(newProjectButton);
}

export default function initializeDisplay() {
  createNewProjectButton(); // appends a new project button at the end
}

const handleProject = (e) => {
  switch(true) {
    case e.target.classList.contains('project-button'):
      loadProject(e);
      break;
    case e.target.classList.contains('delete'):
      deleteProject(e);
      break;
    case e.target.classList.contains('edit'):
      editProject(e);
      break;
  }
}

const findProjectIndex = (title) => {
  return projects.findIndex(
      (project) => { return project.getTitle() == title }
  );
}

const loadProject = (e) => {
  let project = projects[
    findProjectIndex(e.target.id)
  ];

  let projectTitle = document.getElementById('project-title');
  let projectDescription = document.getElementById('project-desc');
  projectTitle.innerText = project.getTitle();
  projectDescription.innerText = project.getDescription();
    
  createNewTodoButton();
}

const editProject = (e) => {
  let projectButton = e.target.parentElement;
  let project = projects[
    findProjectIndex(e.target.parentElement.id)
  ];

  changeTextToEditable(projectButton);
}

const saveTextEdit = (e) => {
  let button = e.target.parentElement;
  switch (true) {
    case button.classList.contains('project'):
    let project = projects[
      findProjectIndex(button.id)
    ];
    project.setTitle(e.target.value);
    button.id = project.getTitle();
    button.replaceChild(
      document.createTextNode(project.getTitle()),
      button.firstChild
      );
      
      break;
      case button.classList.contains('todo'):
      break;
  }
}

const deleteProject = (e) => {
  projects.splice(findProjectIndex(e.target.parentElement.id),1);
  e.target.parentElement.remove();
}

const createTodoButton = (id) => {
  let todoButton = document.createElement('a');
  todoButton.setAttribute('id', id);
  todoButton.innerText = id;
  todoButton.classList.add('todo-button');
  todoButton.classList.add('todo');
  

  return todoButton;
}

const createNewTodoButton = () => {
  let newTodoButton = document.createElement('a');
  newTodoButton.setAttribute('id','new-todo-button');
  newTodoButton.innerText = 'Add new task';
  newTodoButton.classList.add('todo-button');

  newTodoButton.addEventListener('click',(e) => {
    let textEdit = document.createElement('input');
    textEdit.setAttribute('type','text');
    textEdit.setAttribute('placeholder', newTodoButton.innerText);
    newTodoButton.innerText = '';
    newTodoButton.appendChild(textEdit);
    textEdit.focus();
  }, true);
  
  newTodoButton.addEventListener('addTodo', (e) => {
    let details = e.detail;
    let todo = createTodo(details.id, details.projectName);
    let project = projects[findProjectIndex(details.projectName)];
    project.addTodo(todo);
    console.log(project.todos);
    todoListElement.appendChild(createTodoButton(todo.getTitle())); //placeholder
    newTodoButton.remove();
    createNewTodoButton();
  })
  
  newTodoButton.addEventListener('blur', (e) => {
    let projectTitle = document.getElementById('project-title').innerText;
    let textEdit = newTodoButton.firstChild;
    newTodoButton.innerText = textEdit.value;
    textEdit.remove();
    newTodoButton.dispatchEvent(new CustomEvent(
      'addTodo',
      {
        detail: {
          id: newTodoButton.innerText,
          projectName: projectTitle
        }
      }
      ));
    }, true);

  todoListElement.appendChild(newTodoButton);
}

const loadTodos = (project) => {

}