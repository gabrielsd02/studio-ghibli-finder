import axios from 'axios';

// define
axios.defaults.baseURL = 'https://ghibliapi.herokuapp.com';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = '9440fb25-84c0-4a67-94d4-57cac5e38759';

// retorna configurações axios
export default function AxiosConfig(){
   
    return null;

}