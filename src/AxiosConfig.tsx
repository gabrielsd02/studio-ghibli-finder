import axios from 'axios';

// define
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://studio-ghibli-finder-service.onrender.com';

axios.defaults.headers.post['Content-Type'] = 'application/json';

// retorna configurações axios
export default function AxiosConfig(){
   
    return null;

}