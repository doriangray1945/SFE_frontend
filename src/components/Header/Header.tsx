// Header.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import './header.css';
import homeBtn from "./home-btn.png";
import { Link } from "react-router-dom";
import { ROUTES } from '../../../Routes';
import { Button, Image } from "react-bootstrap";
import { useSelector } from 'react-redux'; 
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../slices/userSlice'; 


const Header: React.FC = () => {
    const location = useLocation();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const dispatch = useDispatch();

    const handleExit = ()  => {
        dispatch(logoutUser());
        console.log('Выход успешен');
    }

    return (
        <nav className="navbar">
            <div className="container d-flex align-items-center justify-content-between">
                <div className="logo">SFE</div>

                {(isAuthenticated == false ) && (
                    <Link to={ROUTES.LOGIN}>
                        <Button className="login_btn">Войти</Button>
                    </Link>
                )}

                {(isAuthenticated == true) && (
                    <Button variant="primary" type="submit" className="mt-3" onClick={ handleExit }>
                        Выйти
                    </Button>
                )}

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
