import "./ITunesPage.css";
import { FC, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { City, getCityByName } from '../modules/itunesApi';
import InputField from "../components/InputField/InputField";
import { BreadCrumbs } from "../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from '../../Routes';
import { CityCard } from '../components/MusicCard/MusicCard';
import { useNavigate } from "react-router-dom";
import { CITIES_MOCK } from "../modules/mock";

const CitiesPage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [city, setCities] = useState<City[]>([]);

  const navigate = useNavigate();

  const handleSearch = () => {
    /*setLoading(true);
  
  // Фильтрация данных из SONGS_MOCK на основе введенного значения
    const filteredMockData = SONGS_MOCK.results.filter((item) =>
      item.collectionCensoredName
        .toLocaleLowerCase()
        .startsWith(searchValue.toLocaleLowerCase())
    );

    setMusic(filteredMockData);
    setLoading(false); // Останавливаем состояние загрузки*/

    setLoading(true); // Устанавливаем состояние загрузки
    getCityByName(searchValue)
      .then((response) => {
        // Фильтруем треки, оставляя только те, где `wrapperType` равен "track"
        const filteredCities = response.cities.filter((item) => item.name === searchValue);
        setCities(filteredCities);
      })
      .catch(() => {
        // В случае ошибки используем mock данные, фильтруем по названию альбома
        const filteredMockData = CITIES_MOCK.cities.filter((item) =>
          item.name
            .toLocaleLowerCase()
            .startsWith(searchValue.toLocaleLowerCase())
        );
        setCities(filteredMockData);
      })
      .finally(() => setLoading(false)); // Останавливаем состояние загрузки в любом случае*/
  };

  const handleCardClick = (city_id: number) => {
    // клик на карточку, переход на страницу альбома
    navigate(`${ROUTES.CITIES}/${city_id}`);
  };

  return (
    <div className="container">
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.CITIES }]} />
      
      <InputField
        value={searchValue}
        setValue={(value) => setSearchValue(value)}
        loading={loading}
        onSubmit={handleSearch}
      />

      {loading && (
        <div className="loadingBg">
          <Spinner animation="border" />
        </div>
      )}
      {!loading &&
        (!city.length ? (
          <div>
            <h1>К сожалению, пока ничего не найдено :(</h1>
          </div>
        ) : (
          <Row xs={4} md={4} className="g-4">
            {city.map((item, index) => (
              <Col key={index}>
                <CityCard
                  url={item.url}
                  city_name={item.name}
                  population={item.population}
                  salary={item.salary}
                  unemployment_rate={item.unemployment_rate}
                  imageClickHandler={() => handleCardClick(item.city_id)}
                />
              </Col>
            ))}
          </Row>
        ))}
    </div>
  );
};

export default CitiesPage;