import "./ITunesPage.css";
import { FC, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { ITunesMusic, getMusicByName } from '../modules/itunesApi';
import InputField from "../components/InputField/InputField";
import { BreadCrumbs } from "../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from '../../Routes';
import { MusicCard } from '../components/MusicCard/MusicCard';
import { useNavigate } from "react-router-dom";
import { SONGS_MOCK } from "../modules/mock";

const ITunesPage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [music, setMusic] = useState<ITunesMusic[]>([]);

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
    getMusicByName(searchValue)
      .then((response) => {
        // Фильтруем треки, оставляя только те, где `wrapperType` равен "track"
        const filteredTracks = response.results.filter((item) => item.wrapperType === "track");
        setMusic(filteredTracks);
      })
      .catch(() => {
        // В случае ошибки используем mock данные, фильтруем по названию альбома
        const filteredMockData = SONGS_MOCK.results.filter((item) =>
          item.collectionCensoredName
            .toLocaleLowerCase()
            .startsWith(searchValue.toLocaleLowerCase())
        );
        setMusic(filteredMockData);
      })
      .finally(() => setLoading(false)); // Останавливаем состояние загрузки в любом случае*/
  };

  const handleCardClick = (id: number) => {
    // клик на карточку, переход на страницу альбома
    navigate(`${ROUTES.ALBUMS}/${id}`);
  };

  return (
    <div className="container">
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.ALBUMS }]} />
      
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
        (!music.length ? (
          <div>
            <h1>К сожалению, пока ничего не найдено :(</h1>
          </div>
        ) : (
          <Row xs={4} md={4} className="g-4">
            {music.map((item, index) => (
              <Col key={index}>
                <MusicCard
                  imageClickHandler={() => handleCardClick(item.collectionId)}
                  {...item}
                />
              </Col>
            ))}
          </Row>
        ))}
    </div>
  );
};

export default ITunesPage;
