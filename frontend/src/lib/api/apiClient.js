import axios from 'axios';
import useAuthStore from '../Store/authStore';
const API_URL="https://mentroship-api.onrender.com/api"

const api = axios.create({
   
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})


// Interceptor to add the Authorization header
//

api.interceptors.request.use((config) => {

    const token = useAuthStore.getState().token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

export default api