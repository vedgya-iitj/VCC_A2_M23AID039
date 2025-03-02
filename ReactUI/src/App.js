import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import LandingPage from './LandingPage';
import CreatePost from './CreatePost';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

const App = () => {
    const [currentSection, setCurrentSection] = useState('login');
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleSectionChange = (section) => {
        setCurrentSection(section);
    };

    return (
        <div className="container">
            <h1 className="text-center">Welcome to SimpleBlog</h1>
            <div id="navigation" className="my-4 text-center">
                <button className="btn btn-primary" onClick={() => handleSectionChange('register')}>Register</button>
                <button className="btn btn-success" onClick={() => handleSectionChange('login')}>Login</button>
            </div>

            {currentSection === 'register' && <Register onSectionChange={handleSectionChange} />}
            {currentSection === 'login' && <Login setLoggedInUser={setLoggedInUser} onSectionChange={handleSectionChange} />}
            {currentSection === 'landingPage' && loggedInUser && (
                <LandingPage
                    loggedInUser={loggedInUser}
                    onSectionChange={handleSectionChange}
                />
            )}
            {currentSection === 'createPost' && loggedInUser && (
                <CreatePost loggedInUser={loggedInUser} onSectionChange={handleSectionChange} />
            )}
        </div>
    );
};

export default App;