import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './CitiesEditPages.css';
import { ROUTES, ROUTE_LABELS } from '../../../Routes';
import { Cities } from '../../api/Api';
import { api } from '../../api';
import { AppDispatch, RootState } from '../../store';
import Header from "../../components/Header/Header";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { Alert } from 'react-bootstrap';
import {fetchCitiesList } from '../../slices/citiesSlice';
import { Image } from "react-bootstrap";
import defaultImage from "../../static/images/DefaultImage.jpg";

const CitiesEditPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { cities, error } = useSelector((state: RootState) => state.cities);

    const [newCity, setNewCity] = useState<Partial<Cities>>({});
    
    const isSuperUser = useSelector((state: RootState) => state.user.is_superuser);

    const handleFetchCities = async () => {
        if (!isSuperUser) {
            navigate(`${ROUTES.FORBIDDEN}`);
            return
        }
        dispatch(fetchCitiesList());
      };
    
    useEffect(() => {
        handleFetchCities();
    }, [dispatch]);

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
            await api.cities.citiesCreateCityCreate(cityData);
            setNewCity({
                name: '',
                population: '',
                salary: '',
                unemployment_rate: '',
                description: '',
                url: null,
            });
        } catch (error) {
            alert('Не удалось добавить город.');
        }
    };

    const handleDeleteCity = async (cityId: number) => {
        try {
            await api.cities.citiesDeleteCityDelete(cityId.toString());
        } catch (error) {
            alert('Не удалось удалить город.');
            console.log(error);
        }
    };

    const handleNavigateToEdit = (id: number) => {
        navigate(`${ROUTES.CITIESEDIT}/${id}`);
    };
    

    return (
        <div>
            <Header />
            <div className="container-2">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.CITIESEDIT, path: ROUTES.CITIESEDIT }]} />
                <div className="cities-title">
                    <h1>Управление городами</h1>
                </div>
                <div className="page-container">
                    {error && <Alert variant="danger" style={{ width: '15vw'}}>{error}</Alert>}
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Изображение</th>
                                    <th>Население</th>
                                    <th>Средняя зарплата</th>
                                    <th>Уровень безработицы</th>
                                    <th>Описание</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cities.map((city) => (
                                    <tr key={city.city_id}>
                                        <td>{city.name}</td>
                                        <td><div className="citiesTable">
                                                <Image src={city.url || defaultImage} alt={city.name}></Image>
                                            </div>
                                        </td>
                                        <td>{city.population}</td>
                                        <td>{city.salary}</td>
                                        <td>{city.unemployment_rate}</td>
                                        <td>{city.description}</td>
                                        <td>
                                            <button className="edit-button" onClick={() => handleNavigateToEdit(city.city_id!)}>Редактировать</button>
                                            <button className="delete-button" onClick={() => handleDeleteCity(city.city_id!)}>
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="add-city-form">
                            <h2>Добавить новый город</h2>
                            <div className='container-4'>
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
                                <button onClick={handleAddCity} className='login-btn'>Добавить город</button>
                                </div>
                                <div style={{ height: '3vh'}}></div>
                            </div>
                        <div style={{ height: '15vh'}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CitiesEditPage;