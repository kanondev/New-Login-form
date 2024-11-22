
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../../firebase.init';
import { Link } from 'react-router-dom';

const Login = () => {

    const [success, setSuccess] = useState(false);
    const [loginError, setLoginError] = useState('');
    const emailRef = useRef();

    const handelLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);


        // reset status
        setSuccess(false);
        setLoginError('');


        // login user
        signInWithEmailAndPassword(auth, email, password)
            .then((result => {
                console.log(result.user);
                if(!result.user.emailVerified){
                    setLoginError('Please verify your email address.')
                }
                else {
                    setSuccess(true);
                }


                

            }))
            .catch((error => {
                console.log('ERROR', error.message);
                setLoginError(error.message);
            }))

    }

    const handelForgetPassword = () =>{
        console.log('email verifaction code send', emailRef.current.value);
        const email =emailRef.current.value;
        if(!email){
            console.log('please provide a valid email address')
        }
        else {
            sendPasswordResetEmail(auth, email)
            .then(() =>{
                alert('Password Reset email send, Please check your email')
            })
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handelLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' ref={emailRef} placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label onClick={handelForgetPassword} className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {
                        success && <p className='text-green-400'> User Login successful</p>
                    }
                    {
                        loginError && <p className='text-red-500'> {loginError}</p>
                    }
                    <p className='p-4 ml-4 text-green-300'>New to this websit please: <Link to="/signUp"> Sign Up</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default Login;