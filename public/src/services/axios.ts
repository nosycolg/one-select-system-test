import axios from 'axios'; // poderia ser fetch também

console.log(import.meta.env.VITE_BACKEND_ENDPOINT)
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_ENDPOINT
});

export default api;