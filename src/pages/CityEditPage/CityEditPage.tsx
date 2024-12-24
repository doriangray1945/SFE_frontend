import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CityEditPage.css';
import { Cities } from '../../api/Api';
import { api } from '../../api';
import { CITIES_MOCK } from "../../modules/mock";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ROUTES, ROUTE_LABELS } from '../../../Routes';
import Header from "../../components/Header/Header";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { Alert } from 'react-bootstrap';


const default_image = './images/default_image.jpg';

const CityEditPage: React.FC = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    
    const [cityData, setCityData] = useState<Cities | null>();
    const [error, setError] = useState<string | null>(null);

    const isSuperUser = useSelector((state: RootState) => state.user.is_superuser);

    useEffect(() => {
        if (!id) {
            navigate(`${ROUTES.NOTFOUND}`);
            return
        }

        if (!isSuperUser) {
            navigate(`${ROUTES.FORBIDDEN}`);
            return
        }
        
        const cityReadAsync = async () => {
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
        cityReadAsync();
      }, [id]);

    const handleFieldChange = (field: keyof Cities, value: any) => {
        setCityData((prev) => (prev ? { ...prev, [field]: value } : null));
    };

    const handleSaveChanges = async () => {
        if (cityData) {
            try {
                await api.cities.citiesEditCityUpdate( id? id : '', cityData);
                navigate(`/cities/${id}`);
            } catch (error) {
                setError('Не удалось сохранить изменения.');
            }
        }
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const imageData = { image: file };
    
            try {
                const response = await api.cities.citiesUpdateImageCreate(id ? id : '', imageData);
    
                setCityData((prevState) => (prevState ? { ...prevState, url: response.data.url } : null));
            } catch (error) {
                setError('Не удалось обновить изображение.');
            }
        }
    };

    if (!cityData) return <div>Загрузка...</div>;

    return (
        <div>
            <Header />
            <div className="container-2">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.CITIESEDIT, path: ROUTES.CITIESEDIT },
                    { label: cityData?.name || "Название города" },
                ]} />
                <div className="cities-title">
                    <h1>Редактирование города: {cityData.name}</h1>
                </div>
                {error && <Alert variant="danger" style={{ width: '15vw'}}>{error}</Alert>}            
                <div className="city-edit-form">
                    <div className='container-4'>
                    <img
                        src={cityData.url || default_image}
                        alt="Изображение города"
                        className="city-image"
                    />
                    <input type="file" onChange={handleImageChange} />
                        <label htmlFor="city-name">Название города:</label>
                        <input
                            id="city-name"
                            type="text"
                            value={cityData.name}
                            onChange={(e) => handleFieldChange('name', e.target.value)}
                        />

                        <label htmlFor="city-population">Население:</label>
                        <input
                            id="city-population"
                            type="text"
                            value={cityData.population}
                            onChange={(e) => handleFieldChange('population', e.target.value)}
                        />

                        <label htmlFor="city-salary">Средняя зарплата:</label>
                        <input
                            id="city-salary"
                            type="text"
                            value={cityData.salary}
                            onChange={(e) => handleFieldChange('salary', e.target.value)}
                        />

                        <label htmlFor="city-unemployment-rate">Уровень безработицы:</label>
                        <input
                            id="city-unemployment-rate"
                            type="text"
                            value={cityData.unemployment_rate}
                            onChange={(e) => handleFieldChange('unemployment_rate', e.target.value)}
                        />

                        <label htmlFor="city-description">Описание:</label>
                        <textarea
                            id="city-description"
                            value={cityData.description}
                            onChange={(e) => handleFieldChange('description', e.target.value)}
                        />
                        <div style={{ height: '3vh'}}></div>
                        <button className="login-btn" onClick={handleSaveChanges}>Сохранить изменения</button>
                        <div style={{ height: '3vh'}}></div>
                    </div>
                </div>
                <div style={{ height: '15vh'}}></div>
            </div>
        </div>
    );
};

export default CityEditPage;
