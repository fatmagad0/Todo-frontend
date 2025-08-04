import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://todolistback.up.railway.app/api/tasks";

export function getTasks() {
  return axios.get(`${API_URL}`);
}

export function createTask(task) {
  return axios.post(`${API_URL}`, task);
}

export function updateTask(id, task) {
  return axios.put(`${API_URL}/${id}`, task);
}

export function deleteTask(id) {
  return axios.delete(`${API_URL}/${id}`);
}
