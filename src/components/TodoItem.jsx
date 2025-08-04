import { FaTrash } from "react-icons/fa";

function TodoItem({ task, onDelete, onEdit }) {
  return (
    <li className="bg-white border rounded mb-3 p-3 shadow-sm">
      <div className="flex justify-between items-center">
        <span
          className="font-medium text-gray-800 cursor-pointer hover:text-pink-600"
          onClick={() => onEdit(task)}
        >
          {task.title}
        </span>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
