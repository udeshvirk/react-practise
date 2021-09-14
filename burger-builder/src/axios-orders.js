import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-burger-builder-a419b-default-rtdb.firebaseio.com"
});
instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN from instance';
export default instance;