import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginForm.css';

const LoginForm = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log('Email:', email, 'Password:', password);
    };

    return (
        <div className="login-form-container card">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-form-title">Login</h2>
                <div className="login-form-input-container">
                    <label htmlFor="email" className="login-form-label">Email</label>
                    <input type="email" id="email" name="email" placeholder="Email" className="login-form-input" required />
                </div>
                <div className="login-form-input-container">
                    <label htmlFor="password" className="login-form-label">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password" className="login-form-input" required />
                </div>
                <div className="login-form-forgot-password-container">
                    {/* <Link to="/forgot-password" className="login-form-forgot-password-link">Forgot password</Link> */}
                </div>
                <div className="login-form-button-container">
                    <button type="submit" className="login-form-button">Log in</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;