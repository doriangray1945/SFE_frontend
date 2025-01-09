import { useEffect } from 'react';
import { ROUTES } from '../../../Routes';
import { Col, Button, Form, Row, Image, Alert } from "react-bootstrap";
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CityCard } from '../../components/CityCard/CityCard';
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./VacancyApplicationPage.css"
import FavImage from "../../static/images/favorites.png"
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  getVacancyApplication,
  updateVacancyApplication,
  deleteVacancyApplication,/*
  submittedVacancyApplication,*/
} from '../../slices/vacancyApplicationDraftSlice';
import { setVacancyData, setError } from '../../slices/vacancyApplicationDraftSlice';

const VacancyApplicationPage: FC = () => {
  const { app_id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    cities,
    vacancyData,
    //isLoading,
    error,
    //allowedForSubmitted,
  } = useSelector((state: RootState) => state.vacancyApplicationDraft);

  const isDraft = useSelector((state: RootState) => state.vacancyApplicationDraft.isDraft);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    

  useEffect(() => {
    if (app_id) {
      dispatch(getVacancyApplication(app_id));
    }
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(
        setVacancyData({
            ...vacancyData,
            [name]: value,
        })
    );
  };

  const handleSaveVacancy = () => {
    if (app_id) {
      const vacancyDataToSend = {
        vacancy_name: vacancyData.vacancy_name ?? '',
        vacancy_responsibilities: vacancyData.vacancy_responsibilities ?? '',
        vacancy_requirements: vacancyData.vacancy_requirements ?? ''
      };
      try {
        dispatch(updateVacancyApplication({ appId: app_id, vacancyData: vacancyDataToSend }));
      } catch (error) {
        dispatch(setError(error));
      }
    }
  }

  const handleCardClick = (city_id: number | undefined) => {
    navigate(`${ROUTES.CITIES}/${city_id}`);
  };

  /*const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (app_id) {
      try {
        await dispatch(submittedVacancyApplication(app_id));
        navigate(ROUTES.CITIES);
      } catch (error) {
        dispatch(setError(error));
      }
    }
  };
*/
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (app_id) {
      try {
        await dispatch(deleteVacancyApplication(app_id)).unwrap();
        navigate(ROUTES.CITIES);
      } catch (error) {
        dispatch(setError(error));
      }
    }
  };

  return (
    <div>
      <Header />
        <div className="container-2">  
          <div className="fav-content">
            {error && <Alert variant="danger" style={{ width: '15vw'}}>{error}</Alert>}
            <Row>
                <Col md={8} xs={8}>
                  <h1>Вакансия</h1>
                </Col>
                <Col md={4} xs={4}>
                  <Image src={FavImage}></Image>
                </Col>
            </Row>
            {(!isDraft) ? (
              <div>
                <h4>Название вакансии: {vacancyData.vacancy_name}</h4>
                <h4>Обязанности: {vacancyData.vacancy_responsibilities}</h4>
                <h4>Требования: {vacancyData.vacancy_requirements}</h4>
              </div>
            ) : (
              <div>
                <Form.Group controlId="vacancy_name">
                  <h4>Название вакансии</h4>
                  <Form.Control
                    type="text"
                    name="vacancy_name"
                    value={vacancyData.vacancy_name ?? ''}
                    onChange={handleInputChange}
                    required
                    disabled={!isDraft}
                  />
                </Form.Group>

                <Form.Group controlId="vacancy_responsibilities">
                  <h4>Обязанности</h4>
                  <Form.Control
                    as="textarea"
                    name="vacancy_responsibilities"
                    value={vacancyData.vacancy_responsibilities ?? ''}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    disabled={!isDraft}
                  />
                </Form.Group>

                <Form.Group controlId="vacancy_requirements">
                  <h4>Требования</h4>
                  <Form.Control
                    as="textarea"
                    name="vacancy_requirements"
                    value={vacancyData.vacancy_requirements ?? ''} 
                    onChange={handleInputChange}
                    rows={4}
                    required
                    disabled={!isDraft}
                  />
                </Form.Group>

                <Button type="submit" className="save-button" onClick={handleSaveVacancy}>
                  Сохранить
                </Button>
              </div>
            )}
            <div style={{ height: '3vh'}}></div>
            <h1>Выбранные города для размещения Вашей вакансии</h1>
            
            <div className="cards-wrapper-2 d-flex flex-column">
              {cities.length ? (
                cities.map((item) => (
                  <Col key={item.city_id?.city_id}>
                    <CityCard
                      city_id={item.city_id?.city_id}
                      url={item.city_id?.url}
                      city_name={item.city_id?.name}
                      population={item.city_id?.population}
                      salary={item.city_id?.salary}
                      unemployment_rate={item.city_id?.unemployment_rate}
                      imageClickHandler={() => handleCardClick(item.city_id?.city_id)}
                      count={item.count}
                      isDraft={isDraft}
                    />
                  </Col>
                ))
              ) : (
                <section className="cities-not-found">
                  <h1>К сожалению, пока ничего не найдено :(</h1>
                </section>
              )}
            </div>
            {(isDraft) && (
              <Button className="save-button" onClick={handleDelete}>
                Очистить
              </Button>
            )}
            <div style={{ height: '10vh'}}></div>
          </div>
        </div>
    </div>
  );
};

export default VacancyApplicationPage;

/*

*/