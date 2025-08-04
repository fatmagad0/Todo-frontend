function TodoForm({ formTask, setFormTask, handleSubmit, editId }) {
  return (
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
  );
}

export default TodoForm;
