import { useEffect, useState } from 'react';
import { ROUTES } from '../../../Routes';
import { Col, Button, Form, Row, Image, Alert } from "react-bootstrap";
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CityCard } from '../../components/CityCard/CityCard';
import { api } from '../../api';
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS } from '../../../Routes';
import "./VacancyApplicationPage.css"
import FavImage from "../../static/images/favorites.png"

const VacancyApplicationPage: FC = () => {
  const [isDraft, setIsDraft] = useState(false); 
  const { app_id } = useParams();
  
  const [cities, setCities] = useState<{ 
    city_id?: { 
      city_id?: number | undefined; 
      name: string; 
      population: string; 
      salary: string; 
      unemployment_rate: string; 
      description: string; 
      url?: string | undefined; 
    } | undefined; 
    count?: number | undefined; 
  }[]>([]);
  
  const [vacancyData, setVacancyData] = useState({
    vacancy_name: '',
    vacancy_responsibilities: '',
    vacancy_requirements: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [allowedForSubmitted, setAllowedForSubmitted] = useState(true);
  
  const navigate = useNavigate();

  const handleFilter = async () => {
    try {
      const response = await api.vacancyApplications.vacancyApplicationsRead(app_id? app_id : '');
      console.log(response.data);
      if (response.data.cities) setCities(response.data.cities);
      if (response.data.cities?.length == 0) setAllowedForSubmitted(false);

      
      setVacancyData({
        vacancy_name: response.data.vacancy_application?.vacancy_name || '',
        vacancy_responsibilities: response.data.vacancy_application?.vacancy_responsibilities || '',
        vacancy_requirements: response.data.vacancy_application?.vacancy_requirements || '',
      });

      setIsDraft(response.data.vacancy_application?.status === 1);
    } catch (error) {
      setError('Ошибка при загрузке данных о вакансиях');
    }
  };

  useEffect(() => {
    handleFilter();
  }, [app_id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVacancyData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSaveVacancy = async () => {
    return await api.vacancyApplications.vacancyApplicationsUpdateVacancyUpdate(app_id? app_id : '', { vacancy_name: vacancyData.vacancy_name, vacancy_responsibilities: vacancyData.vacancy_responsibilities, vacancy_requirements: vacancyData.vacancy_requirements })
  }

  const handleDelete = (cityId: number) => {
    setCities(cities.filter(city => city.city_id?.city_id !== cityId));
  };

  const handleCardClick = (city_id: number | undefined) => {
    navigate(`${ROUTES.CITIES}/${city_id}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (app_id) {
      setIsLoading(true);
      try {
        await api.vacancyApplications.vacancyApplicationsUpdateStatusUserUpdate(app_id.toString());
        navigate(`/cities`);
      } catch (error) {
        setError('Ошибка при обновлении вакансии');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <Header />
        <div className="container-2">
          <BreadCrumbs crumbs={[
            { label: ROUTE_LABELS.VACANCYAPPLICATION },
            { label: vacancyData?.vacancy_name || "Название вакансии" },
          ]} />    
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
            {!isDraft ? (
              <div>
                <h4>Название вакансии: {vacancyData.vacancy_name}</h4>
                <h4>Обязанности: {vacancyData.vacancy_responsibilities}</h4>
                <h4>Требования: {vacancyData.vacancy_requirements}</h4>
              </div>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="vacancy_name">
                  <h4>Название вакансии</h4>
                  <Form.Control
                    type="text"
                    name="vacancy_name"
                    value={vacancyData.vacancy_name}
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
                    value={vacancyData.vacancy_responsibilities}
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
                    value={vacancyData.vacancy_requirements} 
                    onChange={handleInputChange}
                    rows={4}
                    required
                    disabled={!isDraft}
                  />
                </Form.Group>

                <Button type="submit" disabled={isLoading || !isDraft} className="save-button" onClick={handleSaveVacancy}>
                  {isLoading ? 'Обновляется...' : 'Сохранить изменения'}
                </Button>
              </Form>
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
                      onDelete={handleDelete}
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
            <div style={{ height: '3vh'}}></div>
            {(isDraft) && (
              <Button className="save-button" onClick={handleSubmit} disabled={!isDraft || !allowedForSubmitted}>
                Оформить
              </Button>
            )}
            <div style={{ height: '10vh'}}></div>
          </div>
        </div>
    </div>
  );
};

export default VacancyApplicationPage;
