import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES} from '../../../Routes';
import "./403.css";
import Header from "../../components/Header/Header";


const ForbiddenPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header/>
            <div className="forbidden-container">
            <h1 className="forbidden-title">403</h1>
            <p className="forbidden-message">Доступ запрещён</p>
            <button 
                className="forbidden-button"
                onClick={() => navigate(ROUTES.HOME)}>
                Вернуться на главную
            </button>
        </div>
        </div>
    );
};

export default ForbiddenPage;