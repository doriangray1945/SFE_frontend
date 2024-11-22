import "./CityPage.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../../Routes";
import { useParams } from "react-router-dom";
import { City, GetCityById } from "../../modules/citiesApi";
import { Col, Row, Spinner, Image } from "react-bootstrap";
import defaultImage from "../../static/images/DefaultImage.jpg";
import { CITIES_MOCK } from "../../modules/mock";
import Header from "../../components/Header/Header";

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
      <div className="container-1">
        <div className="city_page_loader_block">
          <Spinner animation="border" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header/>
      <div className="container-2">
        <Image src={cityData.url || defaultImage} alt={cityData.name}></Image>
      </div>
      <div className="city-page-container">
        <BreadCrumbs
            crumbs={[
              { label: ROUTE_LABELS.CITIES, path: ROUTES.CITIES },
              { label: cityData?.name || "Название города" },
            ]}
        />
        <main>
          <div className="city-content">
            <h1>{cityData.name} - Возможности для бизнеса и поиска сотрудников</h1>
            <h5>{cityData.description}</h5>
          </div>
        </main>
      </div>
      <main>
        <div className="info">
          <Row>
            <Col xs={1} sm={1} md={1}>
              <div className="info-number">!</div>
            </Col>
            <Col xs={11} sm={11} md={11}>
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
    </div>
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