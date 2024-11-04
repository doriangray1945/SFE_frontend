import { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
import "./MusicCard.css";
import defaultImage from "./DefaultImage.jpg";

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
    <Card className="card">
        <Card.Img
            className="cardImage"
            variant="top"
            src={url || defaultImage}
            height={100}
            width={100}
            onClick={imageClickHandler}
        />
        <Card.Body>
            <div className="textStyle">
                <Card.Title>{city_name}</Card.Title>
            </div>
            <div className="textStyle">
                <Card.Text>
                    {population}
                </Card.Text>
            </div>
            <div className="textStyle">
                <Card.Text>
                    {salary}
                </Card.Text>
            </div>
            <div className="textStyle">
                <Card.Text>
                    {unemployment_rate}
                </Card.Text>
            </div>
            <Button
                className="cardButton"
                //href={details_url}
                target="_blank"
                variant="primary"
            >
                Подробнее о городе
            </Button>
        </Card.Body>
    </Card>
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
