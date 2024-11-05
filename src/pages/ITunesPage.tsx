import "./ITunesPage.css";
import { FC, useState } from "react";
import { Col, Row, Spinner, Form, Button } from "react-bootstrap";
import { City, CitiesList } from '../modules/itunesApi';
import InputField from "../components/InputField/InputField";
import { BreadCrumbs } from "../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from '../../Routes';
import { CityCard } from '../components/MusicCard/MusicCard';
import { useNavigate } from "react-router-dom";
import { CITIES_MOCK } from "../modules/mock";
import Header from "../components/Header/header";

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
    CitiesList(searchValue)
      .then((response) => {
        // Фильтруем треки, оставляя только те, где `wrapperType` равен "track"
        const filteredCities = response.cities.filter((item) => item.name 
        .toLocaleLowerCase()
        .startsWith(searchValue.toLocaleLowerCase())
      );
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
    <div >
      <Header/>
      <div className="container-2">
        <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.CITIES }]} />

        <main className="container">
          <section className="cities-title">
            <h1>Города для размещения Вашей вакансии</h1>
          </section>
        </main>

        <section className="cities-and-search">
          <main className="container">
            <Form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="search-bar">
              <Row>
                <Col md={7}>
                  <div className="search-input">
                    <img src="/images/search-image.png" alt="Search Icon" className="search-icon" />
                    <Form.Control
                      type="text"
                      placeholder="Поиск"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="inp-text"
                    />
                  </div>
                </Col>
                <Col md={3}>
                  <Button type="submit" className="search-button">
                    Найти
                  </Button>
                </Col>
                <Col md={2}>
                  <a href="/applications/123" className="btn-favorites">
                    <img src="/images/favorites-btn.png" alt="Избранное" />
                    <span className="badge rounded-pill position-absolute">0</span>
                  </a>
                </Col>
              </Row>
            </Form>

            {loading ? (
              <div className="loadingBg">
                <Spinner animation="border" />
              </div>
            ) : (
              <Row xs={4} md={4} className="g-4 cards-wrapper">
                {city.length ? (
                  city.map((item) => (
                    <Col key={item.city_id}>
                      <CityCard
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
                  <h1>К сожалению, пока ничего не найдено :(</h1>
                )}
              </Row>
            )}
          </main>
        </section>
      </div>
    </div>
  );
};

export default CitiesPage;