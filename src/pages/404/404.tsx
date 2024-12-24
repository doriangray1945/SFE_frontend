import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from '../../../Routes';
import "./404.css";
import Header from "../../components/Header/Header";


const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header/>
            <div className="not-found-container">
                <h1 className="not-found-title">404</h1>
                <p className="not-found-message">Страница не найдена</p>
                <button 
                    className="not-found-button" 
                    onClick={() => navigate(ROUTES.HOME)}>
                    Вернуться на главную
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;