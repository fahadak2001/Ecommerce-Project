import React from "react";
import loader from "./loader.gif";

function LoaderComponent() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.5)'
        }}>
            <div style={{
                margin: 'auto',
                padding: '20px'
            }}>
                <img src={loader} alt="loading" />
            </div>
        </div>
    );
}

export default LoaderComponent;
