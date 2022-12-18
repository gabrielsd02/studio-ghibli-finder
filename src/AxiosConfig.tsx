import axios from 'axios';

// define
axios.defaults.baseURL = 'http://localhost:3001';

axios.defaults.headers.post['Content-Type'] = 'application/json';

// retorna configurações axios
export default function AxiosConfig(){
   
    return null;

}