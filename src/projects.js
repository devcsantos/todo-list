const projectFactory = (title, description = 'New description') => {
  
  let _title = title;
  let _desc = description;

  const getTitle = () => _title;
  const getDescription = () => _desc;

  const setTitle = (title) => _title = title;
  const setDescription = (description) => _desc = description;

  const getMyTodos = (todosArray) => {
    let myTodos = [];

    for(let todo of todosArray) {
      if(todo.getProject() == getTitle()) {
        myTodos.push(todo);
      }
    }

    return myTodos;
  }

  return{
    getTitle,
    getDescription,
    setTitle,
    setDescription,
    getMyTodos
  }
}

export default function createProject(title, description) {
  return projectFactory(title, description);
}