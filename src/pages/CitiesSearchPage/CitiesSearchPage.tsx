import "./CitiesSearchPage.css";
import { FC, useEffect } from "react";
import { Col, Spinner } from "react-bootstrap";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from '../../../Routes';
import { CityCard } from '../../components/CityCard/CityCard';
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import InputField from "../../components/InputField/InputField";
import { useSelector, useDispatch } from 'react-redux';
import { getCitiesList } from '../../slices/citiesSlice';
import { AppDispatch, RootState } from '../../store';
import { Cities } from '../../api/Api';

const CitiesPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchValue, cities, loading } = useSelector((state: RootState) => state.cities);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCitiesList());
  }, [dispatch]);

  const handleCardClick = (city_id: number | undefined) => {
    navigate(`${ROUTES.CITIES}/${city_id}`);
  };

  return (
    <div>
      <Header/>
      <div className="container-2">
        <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.CITIES, path: ROUTES.CITIES }]} />
        <div className="cities-title">
            <h1>Города для размещения Вашей вакансии</h1>
        </div>

        <div className="cities-and-search">
          <InputField
            value={searchValue}
            loading={loading}
          />

          {loading ? (
            <div className="containerLoading">
              <Spinner animation="border" />
            </div>
          ) : (
            <div className="g-4 cards-wrapper">
              {cities.length ? (
                cities.map((item: Cities) => (
                  <Col key={item.city_id}>
                    <CityCard
                      city_id={item.city_id}
                      url={item.url}
                      city_name={item.name}
                      population={item.population}
                      salary={item.salary}
                      unemployment_rate={item.unemployment_rate}
                      imageClickHandler={() => handleCardClick(item.city_id)}
                    />
                  </Col>
                ))
              ) : (
                <section className="cities-not-found">
                  <h1>К сожалению, пока ничего не найдено :(</h1>
                </section>
              )}
            </div> 
          )}
          <div style={{ height: '250px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default CitiesPage;