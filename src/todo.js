const todoFactory = (title, 
  project,
  dueDate = undefined, 
  priority = undefined) => {

  let _title = title;
  let _dueDate = dueDate;
  let _priority = priority;
  let _project = project;
  let _taskDone = false;

  const getTitle = () => _title;
  const getDueDate = () => _dueDate;
  const getPriority = () => _priority;
  const getProject = () => _project;

  const setTitle = (title) => _title = title;
  const setDueDate = (dueDate) => _dueDate = dueDate;
  const setPriority = (priority) => _priority = priority;
  const setProject = (project) => _project = project;
  const isDone = () => _taskDone;

  const toggleTask = () => {
    _taskDone = !_taskDone;

    return _taskDone;
  }

  return {
    getTitle,
    getDueDate,
    getPriority,
    getProject,
    setTitle,
    setDueDate,
    setPriority,
    setProject,
    isDone,
    toggleTask
  }
}

export default function createTodo(title, description, dueDate, priority, project) {
  return todoFactory(title, description, dueDate, priority, project);
}