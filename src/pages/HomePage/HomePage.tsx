import { FC } from "react";;
import { Col, Row, Image } from "react-bootstrap";
import IntroImg from "../../static/images/intro.png"
import Header from "../../components/Header/Header";
import './HomePage.css'


export const HomePage: FC = () => {
  return (
    <div>
      <Header/>
      <main className="container-1">
        <div className="intro">
          <h1>Сервис для работодателей</h1>
          <Row>
            <Col md={4} sm={4}>
                <p>
                  Работодатели ценят соискателей, которые искренне заинтересованы в их компании. Разместите вашу вакансию в нескольких городах: кандидаты, желающие работать именно у вас, <span className="highlight">будут выделены</span> в поиске и их резюме автоматически попадет в папку «Хотят у вас работать».
                </p>
            </Col>
            <Col md={2} sm={2}>
              <Image src={IntroImg}></Image>
            </Col>
          </Row>
        </div>
    </main>
    </div>
  );
};