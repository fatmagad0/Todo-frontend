import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function getTasks() {
  return axios.get(`${API_URL}/tasks`);
}

export function createTask(task) {
  return axios.post(`${API_URL}/tasks`, task);
}

export function updateTask(id, task) {
  return axios.put(`${API_URL}/tasks/${id}`, task);
}

export function deleteTask(id) {
  return axios.delete(`${API_URL}/tasks/${id}`);
}
