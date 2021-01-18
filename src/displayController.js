import createProject from './projects';

let projectsElement = document.getElementById('projects-bar');
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
  createNewProjectButton(); // appends a new project button at the end
};