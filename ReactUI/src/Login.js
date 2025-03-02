import React, { useState } from 'react';

const Login = ({ setLoggedInUser, onSectionChange }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://192.168.1.100:5005/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.message === 'Login successful') {
            alert('Login successful!');
            setLoggedInUser(data.user);
            onSectionChange('landingPage');
        } else {
            alert(data.error || 'Login failed');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    className="form-control mb-2"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    className="form-control mb-2"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="btn btn-success">Login</button>
            </form>
        </div>
    );
};

export default Login;