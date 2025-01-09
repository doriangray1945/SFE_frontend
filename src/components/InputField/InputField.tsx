import { FC } from 'react'
import { Col, Row, Button } from "react-bootstrap";
import searchImg from "../../static/images/search-image.png";
import './InputField.css'
import favoriteImg from "../../static/images/favorites-btn.png"
import { ROUTES } from '../../../Routes';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'; 
import { RootState, AppDispatch } from '../../store';
import { getCitiesList, setSearchValue } from '../../slices/citiesSlice';


interface Props {
    value: string
    loading?: boolean
}

const InputField: FC<Props> = ({ value, loading }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const app_id = useSelector((state: RootState) => state.vacancyApplicationDraft.app_id);
    const count = useSelector((state: RootState) => state.vacancyApplicationDraft.count);

    const handleClick = (app_id: number | null) => {
        navigate(`${ROUTES.VACANCYAPPLICATION}/${app_id}`);
    };

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
                            onChange={(event => dispatch(setSearchValue(event.target.value)))}
                            className="inp-text"
                        />
                    </div>
                </Col>
                <Col xs={3} sm={3} md={3}>
                    <Button disabled={loading} className="search-button" onClick={() => dispatch(getCitiesList())}>
                        Найти
                    </Button>
                </Col>
                <Col xs={2} sm={2} md={2}>
                    <Button className="btn-favorites" onClick={() => handleClick(app_id? app_id : NaN)} disabled={(!isAuthenticated) || (!app_id)}>
                        <img src={favoriteImg} alt="Избранное" />
                        {(!isAuthenticated || !app_id) ? null : (
                            <span className="badge rounded-pill position-absolute">{count}</span>
                        )}
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default InputField