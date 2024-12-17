import { FC } from 'react'
import { Col, Row, Button } from "react-bootstrap";
import searchImg from "../../static/images/search-image.png";
import './InputField.css'
import favoriteImg from "../../static/images/favorites-btn.png"
import { ROUTES } from '../../../Routes';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'; 
import { RootState } from '../../store';

interface Props {
    value: string
    setValue: (value: string) => void
    onSubmit: () => void
    loading?: boolean
}

const InputField: FC<Props> = ({ value, setValue, onSubmit, loading }) => {

    const navigate = useNavigate();

    const handleClick = (app_id: number | null) => {
        navigate(`${ROUTES.VACANCYAPPLICATION}/${app_id}`);
    };

    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    const app_id = useSelector((state: RootState) => state.VacancyApplication.app_id);
    const count = useSelector((state: RootState) => state.VacancyApplication.count);


    return (  
        <div className="search-bar">
            <Row>
                <Col xs={7} sm={7} md={7}>
                    <div className="search-input">
                        <img src={searchImg} alt="Search Icon" className="search-icon" />
                        <input
                            type="text"
                            placeholder="Поиск"
                            value={value}
                            onChange={(event => setValue(event.target.value))}
                            className="inp-text"
                        />
                    </div>
                </Col>
                <Col xs={3} sm={3} md={3}>
                    <Button disabled={loading} className="search-button" onClick={onSubmit}>
                        Найти
                    </Button>
                </Col>
                {(isAuthenticated == true) && (app_id) && (
                    <Col xs={2} sm={2} md={2}>
                        <a className="btn-favorites" onClick={() => handleClick(app_id) }>
                            <img src={favoriteImg} alt="Избранное" />
                            <span className="badge rounded-pill position-absolute">{ count }</span>
                        </a>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default InputField