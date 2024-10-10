import { useState } from "react";
import { Link, useNavigate} from 'react-router-dom';
import * as authService from '../../services/authServices';

const SigninForm = (props) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({        
        username: '',
        password: ''
    })

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await authService.signin(formData)
            props.setUser(user)
            console.log(user)
            navigate('/')
        } catch (error) {
            setMessage(error.message)
        }
        
    };

    const {username, password } = formData

    const isFormValid = () => {
        return !(username && password && password === passwordConf);
        
    }

    return (
        <main>
            <h1>Sign In</h1>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleChange} 
                    />  
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="text" 
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}                        
                    />
                </div>
                <div>
                    <button>Sign In</button>
                    <Link to="/">
                        <button>Cancel</button>
                    </Link>
                </div>
            </form>
        </main>
    )
}

export default SigninForm