import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from '../../../Routes';
import { Button, Col, Row, Image } from "react-bootstrap";
import IntroImg from "../../static/images/intro.png"
import Header from "../../components/Header/Header";
import './HomePage.css'

export const HomePage: FC = () => {
  return (
    <main className="container-1">
      <Header />
      <div className="container">
        <div className="intro">
          <Row>
            <Col md={6}>
                <h1>Сервис для работодателей</h1>
                <p>
                  Работодатели ценят соискателей, которые искренне заинтересованы в их компании. Разместите вашу вакансию в нескольких городах: кандидаты, желающие работать именно у вас, <span className="highlight">будут выделены</span> в поиске и их резюме автоматически попадет в папку «Хотят у вас работать».
                </p>
                <Link to={ROUTES.CITIES}>
                  <Button variant="primary" className="to-cities-button">Доступные города для размещения вакансии</Button>
                </Link>
            </Col>
            <Col md={6}>
              <Image src={IntroImg}></Image>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  );
};
