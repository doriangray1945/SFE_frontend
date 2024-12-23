import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from '../../../Routes';
import "./403.css";

const ForbiddenPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="forbidden-container">
            <h1 className="forbidden-title">403</h1>
            <p className="forbidden-message">Доступ запрещён</p>
            <button 
                className="forbidden-button"
                onClick={() => navigate(ROUTES.HOME)}>
                Вернуться на главную
            </button>
        </div>
    );
};

export default ForbiddenPage;