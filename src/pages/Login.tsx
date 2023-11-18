import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../redux/store";
import { login } from "../redux/slices/users/userSlice";
import { User } from "../types/UserType";

const Login = ({pathName}: {pathName: string}) => {

    document.title = "Login";

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { users } = useSelector((state: RootState) => state.users);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    
    const [error, setError] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        try {
            const foundUser = users.find((userData: User) => userData.email == user.email);
            
            if(!foundUser) {
                setError('* The user with the provided email could not be found');
                return;
            }
            
            if(foundUser.password !== user.password) {
                setError('* User password did not match');
                return;
            }

            if(foundUser.ban) {
                setError('Sorry you have been banned. Please get in touch with the support team.');
                return;
            }

            dispatch(login(foundUser));
            navigate(pathName ? pathName : `/dashboard/${foundUser.role}`);
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="login-container">
            <div className="login">

                <div className="login-img">
                    <img src="public/images/iphone15.png" alt="" width="320"/>
                </div>

                <div className="login-details">
                    <div className="login-details-title">
                        <h1>Welcome Back!</h1>
                        <p>Please enter your details</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="login-details-input">
                            <input type="email" name="email" id="email" value={user.email} onChange={handleChange} placeholder="Email" required/>
                            <input type="password" name="password" id="password" value={user.password} onChange={handleChange} placeholder="Password" required/>
                                    
                            <div className="error-message">
                                {error && 
                                <p>{error}</p>
                                }
                            </div>
                        </div>

                        <div className="login-details-btn">
                            <button type="submit">Log in</button>
                        </div>
                    </form>
                            
                    <div className="login-details-signup">
                        <p>Dont have an account?</p>
                        <Link to="/signup" className="login-details-signup-link">
                            <p>Sign Up</p>
                        </Link>
                    </div>
                </div>     
            </div>
        </div>
    );
}

export default Login;