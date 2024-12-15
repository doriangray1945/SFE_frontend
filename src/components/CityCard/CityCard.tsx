import { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
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
}


export const CityCard: FC<Props> = ({
    city_id,
    city_name,
    population,
    salary,
    unemployment_rate,
    url,
    imageClickHandler,
    count
}) => {
    const { pathname } = useLocation();

    const handlerAdd = async (city_id: number | undefined) => {
        if (city_id) return await api.cities.citiesAddToVacancyApplicationCreate(city_id.toString());
        return
    }

    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

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
                        <Button className="city-btn" onClick={() => handlerAdd(city_id) }>
                            Добавить
                        </Button>
                    )}
                </div>
            </Card>
        </div>
        );
    }

    if (pathname === "/vacancy_application") {
        return (
            <div className="fav-card">
                <div className="row">
                    <div className="col-md-2 d-flex justify-center">
                        <img src={url || defaultImage} alt={city_name} />
                    </div>
                    <div className="col-md-10">
                        <div className="fav-card-body">
                            <h5>{city_name}</h5>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label className="form-label">Количество вакансий: </label>
                                    </div>
                                    <div className="col-md-9">
                                        <input
                                            disabled
                                            type="number"
                                            className="form-control"
                                            value={count || 0}
                                        />
                                    </div>
                                </div>
                            </div>
                            <a onClick={() => imageClickHandler()} className="fav-btn-open">
                                Открыть
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};







/*import { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
import "./MusicCard.css";
import image from "./DefaultImage.jpg";

interface Props {
    artworkUrl100: string;
    artistName: string;
    collectionCensoredName: string;
    trackViewUrl: string;
    imageClickHandler: () => void;
}

export const MusicCard: FC<Props> = ({
    artworkUrl100,
    artistName,
    collectionCensoredName,
    trackViewUrl,
    imageClickHandler // добавляем пропс
}) => (
    <Card className="card">
        <Card.Img
            className="cardImage"
            variant="top"
            src={artworkUrl100 || image}
            height={100}
            width={100}
            onClick={imageClickHandler} // добавляем onClick для вызова imageClickHandler
        />
        <Card.Body>
            <div className="textStyle">
                <Card.Title>{artistName}</Card.Title>
            </div>
            <div className="textStyle">
                <Card.Text>
                    {collectionCensoredName}
                </Card.Text>
            </div>
            <Button
                className="cardButton"
                href={trackViewUrl}
                target="_blank"
                variant="primary"
            >
                Открыть в ITunes
            </Button>
        </Card.Body>
    </Card>
);*/
