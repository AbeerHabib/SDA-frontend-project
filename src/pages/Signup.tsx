import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../redux/store";
import { addUser } from "../redux/slices/users/userSlice";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../types/UserType";

const Signup = () => {

    document.title = "Signup";

    const { users } = useSelector((state: RootState) => state.users);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user',
        ban: false,
    });

    const [error, setError] = useState("");
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        try {
            const foundUser = users.find((userData: User) => userData.email == user.email);
            if(foundUser) {
                setError('* The user account already exists');
                return;
            }
            const nameTestCondition = /[^a-zA-Z]/;
            if(nameTestCondition.test(user.firstName)) {
                setError('* First name cannot contain symbols or numbers');
                return;
            }
            if(nameTestCondition.test(user.lastName)) {
                setError('* Last name cannot contain symbols or numbers');
                return;
            }
            if(user.password.length < 6) {
                setError('* Password must be at least 6 characters');
                return;   
            }
            const passwordTestCondition = /[^a-zA-Z0-9]/;
            if(!passwordTestCondition.test(user.password)) {
                setError('* Password must contains at least one symbole, one number, and one letter');
                return;   
            }
            const newUser = { id: uuidv4(), ...user };
            dispatch(addUser(newUser));
            navigate('/login');
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="signup-container">
            <div className="login">

                <div className="signup-img">
                    <img src="/images/iphone15.png" alt="" width="320"/>
                </div>

                <div className="login-details">
                    <div className="signup-details-title">
                        <h1>Let's create your account!</h1>
                        <p>Please enter your details</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="login-details-input">
                          <div className="user-name-div">
                            <input className="user-fname" type="text" name="firstName" id="firstName" onChange={handleChange} placeholder="First Name" required/>
                            <input className="user-lname" type="text" name="lastName" id="lastName" onChange={handleChange} placeholder="Last Name" required/>
                          </div>
                          <input type="email" name="email" id="email" onChange={handleChange} placeholder="Email" required/>
                          <input type="password" name="password" id="password" onChange={handleChange} placeholder="Password" required/>
                                    
                          <div className="error-message">
                            <p>
                            {error && 
                            <p>{error}</p>
                            }
                            </p>
                          </div>
                        </div>

                        <div className="login-details-btn">
                            <button type="submit">Sign up</button>
                        </div>
                    </form>
                            
                    <div className="login-details-signup">
                        <p>Already have an account?</p>
                        <Link to="/login" className="login-details-signup-link">
                            <p>Log in</p>
                        </Link>
                    </div>
                </div>     
            </div>
        </div>
    );
}

export default Signup;