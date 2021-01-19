const projectFactory = (title, description = 'New description') => {
  let _todos = [];
  
  let _title = title;
  let _desc = description;

  const getTitle = () => _title;
  const getDescription = () => _desc;

  const setTitle = (title) => _title = title;
  const setDescription = (description) => _desc = description;

  const addTodo = (todo) => {
    _todos.push(todo);
  }

  const removeTodo = (todo) => {
    _todos.splice(_todos.indexOf(todo),1);
  }

  const getTodos = () => _todos;

  return{
    getTitle,
    getDescription,
    setTitle,
    setDescription,
    addTodo,
    removeTodo,
    getTodos
  }
}

export default function createProject(title, description) {
  return projectFactory(title, description);
}