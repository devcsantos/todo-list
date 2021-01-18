const projectFactory = (title, description) => {
  let todos = [];
  
  let _title = title;
  let _desc = description;

  const getTitle = () => _title;
  const getDescription = () => _desc;

  const setTitle = (title) => _title = title;
  const setDescription = (description) => _desc = description;

  const addTodo = (todo) => {
    todos.push(todo);
  }

  const removeTodo = (todo) => {
    todos.splice(todos.indexOf(todo),1);
  }

  return{
    getTitle,
    getDescription,
    setTitle,
    setDescription,
    addTodo,
    removeTodo
  }
}

export default function createProject(title, description) {
  return projectFactory(title, description);
}