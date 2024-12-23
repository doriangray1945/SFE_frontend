import { FC, useState } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import "./CityCard.css";
import defaultImage from "../../static/images/DefaultImage.jpg";
import { useSelector } from 'react-redux'; 
import { RootState } from '../../store';
import { api } from '../../api';
import { useLocation } from 'react-router-dom';

interface Props {
    city_id: number | undefined;
    city_name: string | undefined;
    population: string | undefined;
    salary: string | undefined;
    unemployment_rate: string | undefined;
    url: string | null | undefined;
    imageClickHandler: () => void;
    count?: number;
    onDelete?: (cityId: number) => void;
    isDraft?: boolean;
}


export const CityCard: FC<Props> = ({
    city_id,
    city_name,
    population,
    salary,
    unemployment_rate,
    url,
    imageClickHandler,
    count,
    onDelete,
    isDraft
}) => {

    const { pathname } = useLocation();
    const app_id = useSelector((state: RootState) => state.vacancyApplication.app_id);
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    
    const [localCount, setLocalCount] = useState(count); 

    const handlerAdd = async () => {
        if (city_id) return await api.cities.citiesAddToVacancyApplicationCreate(city_id.toString());
        return
    }

    const handlerDelete = async () => {
        if (city_id && app_id) {
            await api.citiesVacancyApplications.citiesVacancyApplicationsDeleteCityFromVacancyApplicationDelete(app_id.toString(), city_id.toString());
            if (onDelete) {
                onDelete(city_id);
            }
        }
    }

    const handlerChange = async (newCount: number) => {
        setLocalCount(newCount);
        if (newCount && app_id && city_id) return await api.citiesVacancyApplications.citiesVacancyApplicationsUpdateVacancyApplicationUpdate(app_id.toString(), city_id.toString(), { count: newCount })
    }

    if (pathname === "/cities") {
        return (
            <div className="city-card">
                <Card className="card">
                    <div className="city-card-body">
                        <div className="city-card-img">
                            <Card.Img
                                variant="top"
                                src={url || defaultImage}
                                alt={city_name}
                                onClick={imageClickHandler} // обработчик клика по изображению
                            />
                        </div>
                        <h5 className="city-name">{city_name}</h5>
                        <p className="city-info">
                            Население: <span className="statistics">{population}</span><br />
                            Средняя зарплата: <span className="statistics">{salary} тыс.</span><br />
                            Уровень безработицы: <span className="statistics">{unemployment_rate} %</span>
                        </p>
                        <Button 
                            className="city-btn" 
                            onClick={() => imageClickHandler() }
                        >
                            Подробнее
                        </Button>
                        {(isAuthenticated == true ) && (
                            <Button className="city-btn" onClick={() => handlerAdd() }>
                                Добавить
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        );
    }

    if (pathname.includes("/vacancy_application")) {
        return (
            <div className="fav-card">
                <Row>
                    <Col xs={2} sm={2} md={2}>
                        <div className="d-flex justify-center">
                            <img src={url || defaultImage} alt={city_name} />
                        </div>
                    </Col>
                    <Col xs={10} sm={10} md={10}>
                        <div className="fav-card-body">
                            <h5>{city_name}</h5>
                            <div className="form-group">
                                <Row>
                                    <Col xs={3} sm={3} md={3}>
                                        <label className="form-label">Количество вакансий: </label>
                                    </Col>
                                    <Col xs={9} sm={9} md={9}>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={localCount}
                                            onChange={(event => handlerChange(Number(event.target.value)))}
                                            disabled={!isDraft}
                                        />
                                    </Col>
                                </Row>
                            </div>
                            <a onClick={() => imageClickHandler()} className="fav-btn-open">
                                Подробнее
                            </a>
                            {(isAuthenticated == true ) && (isDraft) && (
                                <Button className="fav-btn-open" onClick={() => handlerDelete()}>
                                    Удалить
                                </Button>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

    return null;
};