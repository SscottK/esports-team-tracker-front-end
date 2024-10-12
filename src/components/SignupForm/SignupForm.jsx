import { useState } from "react";
import { Link, useNavigate} from 'react-router-dom'
import * as authService from '../../services/authServices'

const SignupForm = (props) => {
    const navigate = useNavigate();    
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConf: '',
    });

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newUserResponse = await authService.signup(formData)
            props.setUser(newUserResponse.user)
            navigate('/')
        } catch (error) {
            setMessage(error.message)
        }
        
    };

    const {username, password, passwordConf} = formData

    const isFormValid = () => {
        return !(username && password && password === passwordConf);
        
    }

    return (
        <main>
            <h1>Sign Up</h1>
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
                        type="password" 
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}                        
                    />
                </div>
                <div>
                    <label htmlFor="passwordConf">Confirm Password</label>
                    <input 
                        type="password" 
                        id="passwordConf"
                        name="passwordConf"
                        value={passwordConf}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button disabled={isFormValid()}>Sign Up</button>
                    <Link to="/">
                        <button>Cancel</button>
                    </Link>
                </div>
            </form>
        </main>
    )
}

export default SignupForm;