import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CityEditPage.css';
import { Cities } from '../../api/Api';
import { CITIES_MOCK } from "../../modules/mock";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { ROUTES, ROUTE_LABELS } from '../../../Routes';
import Header from "../../components/Header/Header";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { Alert } from 'react-bootstrap';
import defaultImage from "../../static/images/DefaultImage.jpg";
import { createCity, editCity, getCity, updateCityImage } from '../../slices/citiesSlice';


const CityEditPage: React.FC = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    
    const [cityData, setCityData] = useState<Cities | null>();
    const [error, setError] = useState<string | null>(null);
    const [flag, setFlag] = useState<boolean>(true);
    const [newCity, setNewCity] = useState<Partial<Cities>>({});

    const isSuperUser = useSelector((state: RootState) => state.user.is_superuser);
    const city = useSelector((state: RootState) => state.cities.city);

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!id) {
            setFlag(false);
        }

        if (!isSuperUser) {
            navigate(`${ROUTES.FORBIDDEN}`);
            return
        }
        
        const cityReadAsync = async () => {
            if (id) {
                try {
                    await dispatch(getCity(id));
                } catch {
                    const cityData = CITIES_MOCK.cities.find(
                    (city) => String(city.city_id) === id
                    );
                    setCityData(cityData);
                }
            }
        };

        if (flag == true) cityReadAsync();
    }, []);

    useEffect(() => {
        // Обновляем cityData, если city обновлено
        if (city) {
            setCityData(city);
        }
    }, [city]);

    const handleFieldChange = (field: keyof Cities, value: any) => {
        setCityData((prev) => (prev ? { ...prev, [field]: value } : null));
    };

    const handleSaveChanges = async () => {
        if (cityData && id) {
            try {
                await dispatch(editCity({ id, cityData })).unwrap();
                navigate(`/cities/${id}`);
            } catch (error) {
                setError('Не удалось сохранить изменения.');
            }
        }
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            try {
                const response = await dispatch(updateCityImage({ id: id || '', file }))
                const newImageUrl = response.payload;

                setCityData((prevState) => (prevState ? { ...prevState, url: `${newImageUrl}?t=${Date.now()}` } : null));
            } catch (error) {
                setError('Не удалось обновить изображение.');
            }
        }
    };

    const handleAddCity = async () => {
        if (!newCity.name || !newCity.population || !newCity.salary || !newCity.unemployment_rate || !newCity.description) {
            alert('Введите все данные!');
            return;
        }
    
        const cityData: Cities = {
            name: newCity.name,
            population: newCity.population,
            salary: newCity.salary,
            unemployment_rate: newCity.unemployment_rate,
            description: newCity.description,
            url: newCity.url || null, // Если URL не указан, передаем null
        };
    
        try {
            const response = await dispatch(createCity(cityData));
    
            const createdCityId = response.payload;
    
            // Проверяем, выбрано ли изображение
            if (fileInputRef.current?.files?.[0]) {
                const file = fileInputRef.current.files[0];
    
                try {
                    await dispatch(updateCityImage({ id: createdCityId? createdCityId?.toString() : '', file }));
                } catch (error) {
                    console.error('Ошибка загрузки изображения:', error);
                    alert('Город добавлен, но изображение не удалось загрузить.');
                }
            }

            navigate(`/cities/${createdCityId}`);

        } catch (error) {
            console.error('Ошибка создания города:', error);
            alert('Не удалось добавить город.');
        }
    };    

    return (
        <div>
            <Header />
            <div className="container-2">
                {(flag == true) && (   
                    <div>
                        <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.CITIESEDIT, path: ROUTES.CITIESEDIT }]} />
                        <div className='cities-title'>
                            <h1>Редактирование города: {cityData?.name || ''}</h1>
                        </div>
                    </div>
                )}
                {(flag == false) && (  
                    <div> 
                        <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.CITIESCREATE, path: ROUTES.CITIESCREATE }]} />
                        <div className='cities-title'>
                            <h1>Создание города</h1>
                        </div>
                    </div>
                )}
                {error && <Alert variant="danger" style={{ width: '15vw'}}>{error}</Alert>} 
                {(flag == true) && (   
                    <div className="city-edit-form">
                        <div className='container-4'>
                            <img
                                src={cityData?.url || defaultImage}
                                alt="Изображение города"
                                className="city-image"
                            />
                            <input type="file" onChange={handleImageChange} />
                            <label htmlFor="city-name">Название города:</label>
                            <input
                                id="city-name"
                                type="text"
                                value={cityData?.name || ''}
                                onChange={(e) => handleFieldChange('name', e.target.value)}
                            />

                            <label htmlFor="city-population">Население:</label>
                            <input
                                id="city-population"
                                type="text"
                                value={cityData?.population || ''}
                                onChange={(e) => handleFieldChange('population', e.target.value)}
                            />

                            <label htmlFor="city-salary">Средняя зарплата:</label>
                            <input
                                id="city-salary"
                                type="text"
                                value={cityData?.salary || ''}
                                onChange={(e) => handleFieldChange('salary', e.target.value)}
                            />

                            <label htmlFor="city-unemployment-rate">Уровень безработицы:</label>
                            <input
                                id="city-unemployment-rate"
                                type="text"
                                value={cityData?.unemployment_rate || ''}
                                onChange={(e) => handleFieldChange('unemployment_rate', e.target.value)}
                            />

                            <label htmlFor="city-description">Описание:</label>
                            <textarea
                                id="city-description"
                                value={cityData?.description || ''}
                                onChange={(e) => handleFieldChange('description', e.target.value)}
                            />
                            <div style={{ height: '3vh'}}></div>
                            <button className="login-btn" onClick={handleSaveChanges}>Сохранить изменения</button>
                            <div style={{ height: '3vh'}}></div>
                        </div>
                    </div>
                )}
                {(flag == false) && (
                    <div className="city-edit-form">
                        <div className='container-4'>
                            <input type="file" ref={fileInputRef}/>
                            <input
                                type="text"
                                placeholder="Название"
                                value={newCity.name || ''}
                                onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Население"
                                value={newCity.population || ''}
                                onChange={(e) => setNewCity({ ...newCity, population: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Средняя зарплата"
                                value={newCity.salary || ''}
                                onChange={(e) => setNewCity({ ...newCity, salary: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Уровень безработицы"
                                value={newCity.unemployment_rate || ''}
                                onChange={(e) => setNewCity({ ...newCity, unemployment_rate: e.target.value })}
                            />
                            <textarea
                                placeholder="Описание"
                                value={newCity.description || ''}
                                onChange={(e) => setNewCity({ ...newCity, description: e.target.value })}
                            />
                            <div style={{ height: '3vh'}}></div>
                            <button className="login-btn" onClick={handleAddCity}>Сохранить</button>
                            <div style={{ height: '3vh'}}></div>
                        </div>
                    </div>
                )}
                <div style={{ height: '15vh'}}></div>
            </div>
        </div>
    );
};

export default CityEditPage;
