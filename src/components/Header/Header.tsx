// Header.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import './header.css';
import homeBtn from "./home-btn.png";
import { Link } from "react-router-dom";
import { ROUTES } from '../../../Routes';
import { Button, Image } from "react-bootstrap";

const Header: React.FC = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="container d-flex align-items-center justify-content-between">
                <div className="logo">SFE</div>

                <Link to={ROUTES.LOGIN}>
                    <Button className="login_btn">Войти</Button>
                </Link>

                {(location.pathname.includes('/applications') || location.pathname.includes('/cities')) && (
                    <Link to={ROUTES.HOME}>
                        <Button className="home-btn">
                            <Image src={ homeBtn } alt="Домой" />
                        </Button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Header;
