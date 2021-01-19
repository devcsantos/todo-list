const todoFactory = (title, 
  project,
  description = undefined, 
  dueDate = undefined, 
  priority = undefined) => {

  let _title = title;
  let _desc = description;
  let _dueDate = dueDate;
  let _priority = priority;
  let _project = project;

  const getTitle = () => _title;
  const getDescription = () => _desc;
  const getDueDate = () => _dueDate;
  const getPriority = () => _priority;
  const getProject = () => _project;

  const setTitle = (title) => _title = title;
  const setDescription = (description) => _desc = description;
  const setDueDate = (dueDate) => _dueDate = dueDate;
  const setPriority = (priority) => _priority = priority;
  const setProject = (project) => _project = project;

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getProject,
    setTitle,
    setDescription,
    setDueDate,
    setPriority,
    setProject
  }
}

export default function createTodo(title, description, dueDate, priority, project) {
  return todoFactory(title, description, dueDate, priority, project);
}