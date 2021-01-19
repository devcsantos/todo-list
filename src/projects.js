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

  const removeTodo = (todoTitle) => {
    _todos.splice(_findTodoIndex(todoTitle),1);
  }

  const _findTodoIndex = (todoTitle) => {
    return _todos.findIndex(
      (todo) => { return todo.getTitle() == todoTitle }
  );
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