import "./AlbumPage.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { useParams } from "react-router-dom";
import { City, GetCityById } from "../modules/itunesApi";
import { Col, Row, Spinner, Image, Container } from "react-bootstrap";
import defaultImage from "../components/MusicCard/DefaultImage.jpg";
import { CITIES_MOCK } from "../modules/mock";
import Header from "../components/Header/header";

export const CityPage: FC = () => {
  const [cityData, setCityData] = useState<City>();

  const { id } = useParams(); // ид страницы, пример: "/albums/12"

  useEffect(() => {
    if (!id) return;

    GetCityById(id)
      .then((response) => {
          console.log("Server Responseeee:", response);
          const cityData = response;
          console.log("Found City Data:", cityData);
          setCityData(cityData);
      })
      .catch(() => {
          console.log("Using Mock Data");
          const cityData = CITIES_MOCK.cities.find(
              (city) => String(city.city_id) === id
          );
          console.log("Found Mock Data:", cityData);
          setCityData(cityData);
      });
  }, [id]);

  if (!cityData) {
    return (
      <div className="city-page-loader">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container fluid>
      <Header/>
      <div className="city-banner">
        <Image src={cityData.url || defaultImage} alt={cityData.name} fluid />
      </div>
      <section className="city-page-container">
        <BreadCrumbs
            crumbs={[
              { label: ROUTE_LABELS.CITIES, path: ROUTES.CITIES },
              { label: cityData?.name || "Название города" },
            ]}
        />
        <main className="container">
          <div className="city-content">
            <h1>{cityData.name} - Возможности для бизнеса и поиска сотрудников</h1>
            <h5>{cityData.description}</h5>
          </div>
        </main>
      </section>
      <main className="container">
        <div className="info">
          <Row>
            <Col md={1}>
              <div className="info-number">!</div>
            </Col>
            <Col md={11}>
              <div className="info-text">
                <p>Статистика по рынку труда</p>
                <ul>
                  <li>Население: {cityData.population} человек.</li>
                  <li>Средняя зарплата: {cityData.salary} тыс. руб.</li>
                  <li>Уровень безработицы: {cityData.unemployment_rate}%.</li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </main>
    </Container>
  );
};


    /*<div>
      <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.CITIES, path: ROUTES.CITIES },
          { label: pageData?.name || "Название города" },
        ]}
      />
      {pageData ? ( // проверка на наличие данных, иначе загрузка
        <div className="container">
          <Row>
            <Col md={6}>
              <p>
                Название города: <strong>{pageData.name}</strong>
              </p>
              <p>
                Описание: <strong>{pageData.description}</strong>
              </p>
            </Col>
            <Col md={6}>
              <Image
                src={pageData.url || defaultImage} // дефолтное изображение, если нет artworkUrl100
                alt="Картинка"
                width={100}
              />
            </Col>
          </Row>
        </div>
      ) : (
        <div className="album_page_loader_block">{/* загрузка *//*} 
          <Spinner animation="border" />
        </div>
      )}
    </div>
  );
};*/