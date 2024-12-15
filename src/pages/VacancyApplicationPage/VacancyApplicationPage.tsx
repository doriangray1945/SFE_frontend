import { useEffect, useState } from 'react';
import { ROUTES } from '../../../Routes';
import { Col, /*Row, Spinner*/ } from "react-bootstrap";
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CityCard } from '../../components/CityCard/CityCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { api } from '../../api';


const VacancyApplicationPage: FC = () => {
  /*const [loading, setLoading] = useState(false);*/
  
  const app_id = useSelector((state: RootState) => state.VacancyApplication.app_id);

  const [cities, setCities] = useState<{ city_id?: { 
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

  const navigate = useNavigate();

  const handleFilter = async () => {
    /*setLoading(true);*/
    try {
      const response = await api.vacancyApplications.vacancyApplicationsRead(app_id.toString());
      if (response.data.cities) setCities(response.data.cities); 
    } catch {
      
    }
      /*.finally(() => setLoading(false));*/
  };

  useEffect(() => {
    handleFilter();
  }, []);

  const handleCardClick = (city_id: number | undefined) => {
    navigate(`${ROUTES.CITIES}/${city_id}`);
  };

  return (
    <main className="container">
      <section className="fav-content">
        <div className="row">
          <div className="col-md-8">
            <h1>Вакансия</h1>
            <div style={{ height: '26px' }} />
            


          </div>
          <div className="col-md-4">
            <img src="/static/images/favorites.png" className="intro-image" alt="Вакансия" />
          </div>
        </div>

        <h1>Выбранные города для размещения Вашей вакансии</h1>
        <div style={{ height: '20px' }} />

        <div className="cards-wrapper d-flex flex-column">
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
                    />
                  </Col>
                ))
              ) : (
                <section className="cities-not-found">
                  <h1>К сожалению, пока ничего не найдено :(</h1>
                </section>
              )}
        </div>

        <div style={{ height: '222px' }} />
      </section>
    </main>
  );
};

export default VacancyApplicationPage;