import React from 'react';
import '../styles/Greeting.css';

function Greeting(props) {
    return (
        <div>
            <h1 className="title">Welcome to SmartInfo!</h1>
            <p className="subtitle">Hello {props.username}!</p>
        </div>
    );
}

export default Greeting;
