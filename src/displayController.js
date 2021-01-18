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
  return projectButton;
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
    newProjectButton.innerText = '';
    newProjectButton.appendChild(textEdit);
    textEdit.focus();
  }, true);
  
  newProjectButton.addEventListener('addProject', (e) => {
    let project = createProject(e.detail.id, 'New project description');
    projects.push(project);
    projectsElement.appendChild(createProjectButton(project.getTitle()));
    newProjectButton.remove();
    createNewProjectButton();
  })
  
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
  loadProject('test');
  createNewProjectButton(); // appends a new project button at the end
};

const loadProject = (title) => {
  let project = createProject('test project', 'test project description');

  let projectTitle = document.getElementById('project-title');
  let projectDescription = document.getElementById('project-desc');
  projectTitle.innerText = project.getTitle();
  projectDescription.innerText = project.getDescription();

  createNewTodoButton();
}

const createTodoButton = (id) => {
  let projectButton = document.createElement('a');
  projectButton.setAttribute('id', id);
  projectButton.innerText = id;
  projectButton.classList.add('todo-button');
  return projectButton;
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
    let todo = createTodo('test','test','test','test','test'); //placeholder implement form for CRUD todo items
    todoListElement.appendChild(createTodoButton(todo.getTitle())); //placeholder
    newTodoButton.remove();
    createNewTodoButton();
  })
  
  newTodoButton.addEventListener('blur', (e) => {
    let textEdit = newTodoButton.firstChild;
    newTodoButton.innerText = textEdit.value;
    textEdit.remove();
    newTodoButton.dispatchEvent(new CustomEvent(
      'addTodo',
      {
        detail: {
          id: newTodoButton.innerText
        }
      }
      ));
    }, true);

  todoListElement.appendChild(newTodoButton);
}

const loadTodos = (project) => {

}