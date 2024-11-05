// Header.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import './header.css';
import homeBtn from "./home-btn.png";

const Header: React.FC = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="container d-flex align-items-center justify-content-between">
                <div className="logo">SFE</div>
                {(location.pathname.includes('/applications') || location.pathname.includes('/cities')) && (
                    <a href="/" className="home-btn">
                        <img src={homeBtn } alt="Домой" />
                    </a>
                )}
            </div>
        </nav>
    );
};

export default Header;
