import { useState, useEffect } from "react";
import axios from "axios";
import { FcTodoList } from "react-icons/fc";
import { FaTrash } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function TodoList1() {
  const [tasks, setTasks] = useState([]);
  const [formTask, setFormTask] = useState({ title: "", description: "", done: false });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  function fetchTasks() {
    axios
      .get(`${API_URL}/tasks`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }

  function deleteTask(taskId) {
    axios
      .delete(`${API_URL}/tasks/${taskId}`)
      .then(fetchTasks)
      .catch((err) => console.error(err));
  }

  function handleEditClick(task) {
    setFormTask({ title: task.title, description: task.description || "", done: task.done || false });
    setEditId(task._id);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formTask.title.trim()) return;

    try {
      if (editId) {
        await axios.put(`${API_URL}/tasks/${editId}`, formTask);
      } else {
        await axios.post(`${API_URL}/tasks`, formTask);
      }
      setFormTask({ title: "", description: "", done: false });
      setEditId(null);
      fetchTasks();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-pink-200 p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          To-do List
          <FcTodoList className="inline ml-2 text-3xl" />
        </h1>

        <form onSubmit={handleSubmit} className="mb-6 space-y-2">
          <input
            type="text"
            value={formTask.title}
            onChange={(e) => setFormTask({ ...formTask, title: e.target.value })}
            placeholder="Title"
            className="w-full px-3 py-2 border rounded bg-white"
          />
          <textarea
            value={formTask.description}
            onChange={(e) => setFormTask({ ...formTask, description: e.target.value })}
            placeholder="Description"
            className="w-full px-3 py-2 border rounded bg-white"
          />
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={formTask.done}
              onChange={(e) => setFormTask({ ...formTask, done: e.target.checked })}
              className="mr-2"
            />
            Done
          </label>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {editId ? "Update Task" : "Add Task"}
          </button>
        </form>

        <ul>
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-white border rounded mb-3 p-3 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <span
                  className="font-medium text-gray-800 cursor-pointer hover:text-pink-600"
                  onClick={() => handleEditClick(task)}
                >
                  {task.title}
                </span>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList1;
