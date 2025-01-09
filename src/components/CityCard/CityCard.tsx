import { FC } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import "./CityCard.css";
import defaultImage from "../../static/images/DefaultImage.jpg";
import { useSelector } from 'react-redux'; 
import { AppDispatch, RootState } from '../../store';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCityToVacancyApplication, deleteCityFromVacancyApplication, /*updateCityVacancyCount,*/ setCities } from '../../slices/vacancyApplicationDraftSlice';
import { getCitiesList } from '../../slices/citiesSlice';


interface Props {
    city_id: number | undefined;
    city_name: string | undefined;
    population: string | undefined;
    salary: string | undefined;
    unemployment_rate: string | undefined;
    url: string | null | undefined;
    imageClickHandler: () => void;
    count?: number;
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
    isDraft
}) => {

    const { pathname } = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    const app_id = useSelector((state: RootState) => state.vacancyApplicationDraft.app_id);
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const cities = useSelector((state: RootState) => state.vacancyApplicationDraft.cities);
    
    /*const [localCount, setLocalCount] = useState(count); 
*/
    const handleAdd = async () => {
        if (city_id) {
            await dispatch(addCityToVacancyApplication(city_id));
            await dispatch(getCitiesList());
        }
    }

    const handleDeleteCity = async () => {
        if (city_id && app_id) {
            await dispatch(deleteCityFromVacancyApplication({ appId: app_id, cityId: city_id }));
            dispatch(setCities(cities.filter(city => city.city_id?.city_id !== city_id)));
        }
    }

    /*const handleChange = async (newCount: number) => {
        setLocalCount(newCount);
        if (newCount && app_id && city_id) await dispatch(updateCityVacancyCount({ appId: app_id, cityId: city_id, count: newCount }));
    }*/

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
                            <Button className="city-btn" onClick={() => handleAdd() }>
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
                                            className="localcount"
                                            value={count}
                                            //onChange={(event => handleChange(Number(event.target.value)))}
                                            disabled
                                        />
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                <Col md={3} xs={3}>
                                    <a onClick={() => imageClickHandler()} className="fav-btn-open">
                                        Подробнее
                                    </a>
                                </Col>
                                <Col md={3} xs={3}>
                                    
                                {(isDraft) && (
                                    <Button className="fav-btn-open" onClick={() => handleDeleteCity()}>
                                        Удалить
                                    </Button>
                                )}

                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

    return null;
};

/*




*/