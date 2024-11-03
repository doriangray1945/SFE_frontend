import { FC } from 'react';
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
);
