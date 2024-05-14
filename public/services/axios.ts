import axios from 'axios'; // poderia ser fetch também

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_ENDPOINT,
});

export default api;
