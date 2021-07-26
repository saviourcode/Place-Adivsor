import axios from 'axios';
import {useState, useRef} from 'react'
import './Login.css'
import CancelIcon from '@material-ui/icons/Cancel';

export default function Login({setShowLogin, myLocalStorage, setCurrentUser}){
    const [error, setError] = useState(false);
    const nameRef = useRef();
    const passRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: nameRef.current.value,
            password: passRef.current.value
        }

        try{
            const res = await axios.post('/users/login', user);
            myLocalStorage.setItem("user",res.data.username);
            setShowLogin(false);
            setCurrentUser(res.data.username);
            setError(false);
        }catch(err){
            setError(true);
        }
    }

    return (
        <div className="loginContainer">
            <div className="logo">
                 <a href="https://www.youtube.com/watch?v=9oEQvI7K-rA">LamaDev from YouTube</a>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef}/>
                <input type="password" placeholder="password" ref={passRef}/>
                <button className="loginBtn">Login</button>
                {error && (<span className="failure">Something went wrong!</span>)}
            </form>
            <CancelIcon className="loginCancel" onClick={()=> setShowLogin(false)}/>
        </div>
    )
}


