import { useState, useEffect } from "react";
import { FcTodoList } from "react-icons/fc";
import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm"
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask as deleteTaskService,
} from "../api/api";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [formTask, setFormTask] = useState({ title: "", description: "", done: false });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  function fetchTasks() {
    getTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }

  function handleEditClick(task) {
    setFormTask({
      title: task.title,
      description: task.description || "",
      done: task.done || false,
    });
    setEditId(task._id);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formTask.title.trim()) return;

    try {
      if (editId) {
        await updateTask(editId, formTask);
      } else {
        await createTask(formTask);
      }
      setFormTask({ title: "", description: "", done: false });
      setEditId(null);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  }

  function handleDelete(taskId) {
    deleteTaskService(taskId)
      .then(fetchTasks)
      .catch((err) => console.error(err));
  }

  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-pink-200 p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          To-do List
          <FcTodoList className="inline ml-2 text-3xl" />
        </h1>

        <TodoForm
          formTask={formTask}
          setFormTask={setFormTask}
          handleSubmit={handleSubmit}
          editId={editId}
        />

        <ul>
          {tasks.map((task) => (
            <TodoItem
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onEdit={handleEditClick}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
