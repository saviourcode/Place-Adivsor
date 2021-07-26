import axios from 'axios';
import {useState, useRef} from 'react'
import './Register.css'
import CancelIcon from '@material-ui/icons/Cancel';

export default function Register({setShowRegister}){
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passRef.current.value
        }

        try{
            const res = await axios.post('/users/register', newUser);
            setSuccess(true);
            setError(false);
        }catch(err){
            setError(true);
            setSuccess(false);
        }
    }

    return (
        <div className="registerContainer">
            <div className="logo">
                 <a href="https://www.youtube.com/watch?v=9oEQvI7K-rA">LamaDev from YouTube</a>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef}/>
                <input type="email" placeholder="email" ref={emailRef}/>
                <input type="password" placeholder="password" ref={passRef}/>
                <button className="registerBtn">Register</button>
                {success && (<span className="success">Successful, You can login now!</span>)}
                {error && (<span className="failure">Something went wrong!</span>)}
            </form>
            <CancelIcon className="registerCancel" onClick={()=> setShowRegister(false)}/>
        </div>
    )
}


