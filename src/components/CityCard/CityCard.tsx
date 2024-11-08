import { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
import "./CityCard.css";
import defaultImage from "../../static/images/DefaultImage.jpg";

interface Props {
    city_name: string;
    population: string;
    salary: string;
    unemployment_rate: string;
    url: string;
    imageClickHandler: () => void;
}

export const CityCard: FC<Props> = ({
    city_name,
    population,
    salary,
    unemployment_rate,
    url,
    imageClickHandler
}) => (
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
            </div>
        </Card>
    </div>
);







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
