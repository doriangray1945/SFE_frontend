import "./CityPage.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../../Routes";
import { useParams } from "react-router-dom";
import { Cities } from '../../api/Api'
import { Col, Row, Spinner, Image } from "react-bootstrap";
import defaultImage from "../../static/images/DefaultImage.jpg";
import { CITIES_MOCK } from "../../modules/mock";
import Header from "../../components/Header/Header";
import { api } from '../../api';

export const CityPage: FC = () => {
  const [cityData, setCityData] = useState<Cities>();

  const { id } = useParams(); // ид страницы, пример: "/albums/12"

  useEffect(() => {
    if (!id) return;

    const fetchCityData = async () => {
      try {
        const response = await api.cities.citiesRead(id);
        const cityData = response.data;
        setCityData(cityData);
      } catch {
        const cityData = CITIES_MOCK.cities.find(
          (city) => String(city.city_id) === id
        );
        setCityData(cityData);
      }
    };
  
    fetchCityData();

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
      <div className="city-banner">
        <Image src={cityData.url || defaultImage} alt={cityData.name}></Image>
      </div>
      <div className="city-page-container">
        <BreadCrumbs
            crumbs={[
              { label: ROUTE_LABELS.CITIES, path: ROUTES.CITIES },
              { label: cityData?.name || "Название города" },
            ]}
        />
        <div className="city-content">
          <h1>{cityData.name} - Возможности для бизнеса и поиска сотрудников</h1>
          <h5>{cityData.description}</h5>
        </div>
      </div>
      <div className="info">
        <Row>
          <Col xs={2} sm={2} md={1}>
            <div className="info-number">!</div>
          </Col>
          <Col xs={10} sm={10} md={11}>
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
    </div>
  );
};