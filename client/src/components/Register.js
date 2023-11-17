import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/register.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast} from "react-hot-toast";
import { faUser, faEnvelope, faMars, faCalendarAlt, faCity,  faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

//!CHECK IF USER HAS GIVEN THE TEST, THEN ONLY ALLOW TO REGISTER
//* get the user by using token in localstorage and then check if the user is registered or not
const RegistrationPage = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ username: "", email: "", phone: ""});

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);

    const [loading, setLoading] = useState(false);
    

    const handleRegister = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error("Passwords not matched");
            return;
        }
        if(password.length<3){
            toast.error("Password should be of atleast 3 chars");
            return;
        }
        const updatedCreds = credentials;
        updatedCreds["password"] = password;

        // console.log(updatedCreds);

        try {
            const response = await fetch(`http://localhost:5000/api/user/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCreds)
            });
            let response1 = await response.json();
            console.log(response1);
            if (response1.success === true) {
                toast.success("Registered");
            }
            else {
                toast.error("Not able to resgistrer");
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Some error occured. Please try again later")
        }


    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordMatch(event.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordMatch(event.target.value === password);
    };



    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }



    const RegisterComponent = () => {
        return (


            <div className="registration-page">
                <form onSubmit={handleRegister}>
                    <div className="input-field">
                        <label htmlFor="username">
                            <FontAwesomeIcon icon={faUser} />
                            &nbsp;
                            {"Username"}
                            <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name='username'
                            placeholder={"Username"}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="password">
                            <FontAwesomeIcon icon={faLock} />
                            &nbsp;
                            {"Password"}
                            <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="password"
                            id='password'
                            placeholder={"Password"}
                            value={password}
                            onChange={handlePasswordChange}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">
                            <FontAwesomeIcon icon={faLock} />
                            &nbsp;
                            Confirm Password
                            <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="password"
                            className={`login-input ${passwordMatch ? '' : 'password-mismatch'}`}
                            placeholder={"Confirm password"}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="email">
                            <FontAwesomeIcon icon={faEnvelope} />
                            &nbsp;
                            {"Email"}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            placeholder={"Email"}
                            onChange={handleChange}
                        // required
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="phone">
                            <FontAwesomeIcon icon={faEnvelope} />
                            &nbsp;
                            {"Phone"}
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name='phone'
                            placeholder={"Phone"}
                            onChange={handleChange}
                        // required
                        />
                    </div>
                    {!passwordMatch && <p className="error-message">Password not match</p>}

                    <button type="submit" >{"Register"} <FontAwesomeIcon icon={faUnlock} /></button>
                </form>
            </div>
        )
    }

    return (
        <div className='register-outer-div'>

            {RegisterComponent()}

        </div>
    );
};

export default RegistrationPage;
