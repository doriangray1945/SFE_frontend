// CitiesPage.tsx
import "./CitiesSearchPage.css";
import { FC, useEffect, useState } from "react";
import { Col, /*Row,*/ Spinner } from "react-bootstrap";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from '../../../Routes';
import { CityCard } from '../../components/CityCard/CityCard';
import { useNavigate } from "react-router-dom";
import { CITIES_MOCK } from "../../modules/mock";
import Header from "../../components/Header/Header";
import InputField from "../../components/InputField/InputField"
import { useSelector, useDispatch } from 'react-redux'; 
import { setSearchValue } from '../../slices/citiesSlice';
import { RootState } from '../../store';
import { setAppId, setCount } from "../../slices/VacancyApplicationSlice";
import { api } from '../../api';
import { Cities } from '../../api/Api'

const CitiesPage: FC = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state: RootState) => state.cities.searchValue);
  
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<Cities[]>([]);

  const app_id = useSelector((state: RootState) => state.VacancyApplication.app_id);
  const count = useSelector((state: RootState) => state.VacancyApplication.count);

  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await api.cities.citiesList();
      const app_id = response.data.draft_vacancy_application;
      const count = response.data.count;
      dispatch(setAppId(app_id));
      dispatch(setCount(count));

      const filteredCities = response.data.cities.filter((item) => 
        item.name && item.name.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase())
      );
      
      setCities(filteredCities);
    } catch {
      const filteredMockData = CITIES_MOCK.cities.filter((item) =>
        item.name.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase()));
      setCities(filteredMockData);
    } finally {
      setLoading(false);
    } 
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleCardClick = (city_id: number | undefined) => {
    navigate(`${ROUTES.CITIES}/${city_id}`);
  };

  return (
    <div>
      <Header/>
      <div className="container-2">
        <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.CITIES }]} />
        <div className="cities-title">
            <h1>Города для размещения Вашей вакансии</h1>
        </div>

        <div className="cities-and-search">
          <InputField
            value={searchValue}
            setValue={(value) => dispatch(setSearchValue(value))}
            loading={loading}
            onSubmit={handleSearch}
            app_id={app_id}
            count={count}
          />

          {loading ? (
            <div className="containerLoading">
              <Spinner animation="border" />
            </div>
          ) : (
            <div /*Row xs={4} sm={4} md={4}*/ className="g-4 cards-wrapper">
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
            </div> /*</Row>*/
          )}
          <div style={{ height: '250px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default CitiesPage;
