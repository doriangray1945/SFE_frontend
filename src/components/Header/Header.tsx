// Header.tsx
import React from 'react';
import './header.css';
import { Link } from "react-router-dom";
import { ROUTES } from '../../../Routes';
import { Button } from "react-bootstrap";
import { useSelector } from 'react-redux'; 
import { AppDispatch, RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { logoutUserAsync } from '../../slices/userSlice'; 
import { setAppId, setCount } from '../../slices/vacancyApplicationDraftSlice';
import { setSearchValue } from '../../slices/citiesSlice'; 
import { api } from '../../api';
import { useNavigate } from "react-router-dom";

interface Props {
    onChange?: () => void
}

const Header: React.FC <Props> = ({ onChange }) => {
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleExit = async ()  => {
        dispatch(logoutUserAsync());

        dispatch(setAppId(null));
        dispatch(setCount(0));
        dispatch(setSearchValue(''));
        
        navigate('/cities');
        
        if (onChange) {
            onChange();  
        }
        return await api.logout.logoutCreate();
    }

    return (
        <nav className="navbar">
            <div className="container d-flex align-items-center justify-content-between">
                <div className="logo">SFE</div>

                {(isAuthenticated == false ) && (
                    <Link to={ROUTES.LOGIN}>
                        <Button className="login-btn">Войти</Button>
                    </Link>
                )}

                {(isAuthenticated == false ) && (
                    <Link to={ROUTES.REGISTER}>
                        <Button className="login-btn">Регистрация</Button>
                    </Link>
                )}

                {(isAuthenticated == true) && (
                    <Button variant="primary" type="submit" className="login-btn" onClick={ handleExit }>
                        Выйти
                    </Button>
                )}
            </div>
        </nav>
    );
};

export default Header;


/*{(location.pathname.includes('/applications') || location.pathname.includes('/cities')) && (
                    <Link to={ROUTES.HOME}>
                        <Button className="home-btn">
                            <Image src={ homeBtn } alt="Домой" />
                        </Button>
                    </Link>
                )} */