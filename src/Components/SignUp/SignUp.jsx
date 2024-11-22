import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../../firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const handelSignUp = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        const username = event.target.username.value;
        const terms = event.target.terms.checked;

        console.log(email, password, name, username, terms);

        // reset error and status
        setErrorMessage('');
        setSuccess(false);

        if(!terms){
            setErrorMessage('please accept Our terms and Condaction')
            return;
        }


        if(password.length < 6) {
            setErrorMessage('Password should be 6 charchter or longer');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage('Enter least one uppercase, one lowercase, one number, one special charachter');
            return;
        }

        // creae user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess(true);

                // send verifaction code
                sendEmailVerification(auth.currentUser)
                .then(() =>{
                    console.log('verifaction code send');
                })
            })
            .catch(error => {
                console.log('ERROR', error.message);
                setErrorMessage(error.message)
                setSuccess(false);
            })
    }
    return (
        <div>
            <h2 className="text-4xl my-8">SignUp form</h2>
            <form onSubmit={handelSignUp} className='max-w-lg mx-auto'>
                <label className="input input-bordered flex items-center gap-2 my-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" name="name" className="grow" placeholder="Name" />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" name="username" className="grow" placeholder="Username" />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="email" name="email" className="grow" placeholder="Email" />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        className="grow"
                        placeholder='Password' />
                    <div className="form-control">
                    </div>
                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className='btn btn-xs'>
                        {
                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }
                    </button>
                </label>

                <div className='form-control'>
                    <label className="cursor-pointer label justify-start cursor-pointer">
                        <input type="checkbox" name='terms' defaultChecked className="checkbox checkbox-success" />
                        <span className="label-text mx-4 font-semibold">Accept Our tems and Condiction </span>
                    </label>
                </div>

                <button className="btn btn-accent btn-wide">Sign Up</button>
                {
                    errorMessage && <p className='text-red-600'> {errorMessage}</p>
                }
                {
                    success && <p className='text-green-500'> Sign up successfull</p>
                }

                <p className='m-2 font-bold'> Already have an account? Please: <Link to="/login">Login</Link> </p>

            </form>
        </div>
    );
};

export default SignUp;