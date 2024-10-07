import axios from 'axios';
import { setUser} from '../slice/userSlice/UserSlice';
const URL = "https://jsonplaceholder.typicode.com/users";


export const getUser = () => async dispatch => {
    try {
        const {data} = await axios.get(URL);
        dispatch(setUser(data))
        return data
    }catch(err){
        return err
    }
}
