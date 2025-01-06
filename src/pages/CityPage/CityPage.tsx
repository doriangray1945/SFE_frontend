import "./CityPage.css";
import { FC, useEffect } from "react";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../../Routes";
import { useParams } from "react-router-dom";
import { Col, Row, Spinner, Image } from "react-bootstrap";
import defaultImage from "../../static/images/DefaultImage.jpg";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { RootState } from "../../store";
import { getCity } from "../../slices/citiesSlice";

export const CityPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();

  const { city } = useSelector((state: RootState) => state.cities);

  useEffect(() => {
    if (!id) return;

    dispatch(getCity(id));
  }, [id]);

  if (!city) {
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
        <Image src={city.url || defaultImage} alt={city.name}></Image>
      </div>
      <div className="city-page-container">
        <BreadCrumbs
            crumbs={[
              { label: ROUTE_LABELS.CITIES, path: ROUTES.CITIES },
              { label: city?.name || "Название города" },
            ]}
        />
        <div className="city-content">
          <h1>{city.name} - Возможности для бизнеса и поиска сотрудников</h1>
          <h5>{city.description}</h5>
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
                <li>Население: {city.population} человек.</li>
                <li>Средняя зарплата: {city.salary} тыс. руб.</li>
                <li>Уровень безработицы: {city.unemployment_rate}%.</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};