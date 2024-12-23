import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './CitiesEditPages.css';
import { ROUTES, ROUTE_LABELS } from '../../../Routes';
import { Cities } from '../../api/Api';
import { api } from '../../api';
import { CITIES_MOCK } from "../../modules/mock";

const CitiesEditPage: React.FC = () => {
    const navigate = useNavigate();

    const [cities, setCities] = useState<Cities[]>([]);

    const [newCity, setNewCity] = useState<Partial<Cities>>({});
    const [error, setError] = useState<string | null>(null);

    const handleFetchCities = async () => {
        try {
          const response = await api.cities.citiesList();
          setCities(response.data.cities);
        } catch {
          const filteredMockData = CITIES_MOCK.cities;
          setCities(filteredMockData);
        }
      };
    
      useEffect(() => {
        handleFetchCities();
      }, []);

    const handleAddCity = async () => {
        if (!newCity.name || !newCity.population || !newCity.salary || !newCity.unemployment_rate || !newCity.description) {
            setError('Введите все данные!');
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
            setError('Не удалось добавить город.');
        }
    };

    const handleDeleteCity = async (cityId: number) => {
        try {
            await api.cities.citiesDeleteCityDelete(cityId.toString());
        } catch (error) {
            setError('Не удалось удалить город.');
        }
    };

    const handleNavigateToEdit = (id: number) => {
        navigate(`${ROUTES.CITIESEDIT}/${id}`);
    };
    

    return (
        <div className="cities-admin-page">
            <h1>Управление городами</h1>
            {error && <div className="error-message">{error}</div>}
            <table>
                <thead>
                    <tr>
                        <th>Название</th>
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
                            <td>{city.population}</td>
                            <td>{city.salary}</td>
                            <td>{city.unemployment_rate}</td>
                            <td>{city.description}</td>
                            <td>
                                <button onClick={() => handleNavigateToEdit(city.city_id!)}>Редактировать</button>
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
                <input
                    type="text"
                    placeholder="URL (опционально)"
                    value={newCity.url || ''}
                    onChange={(e) => setNewCity({ ...newCity, url: e.target.value })}
                />
                <button onClick={handleAddCity}>Добавить город</button>
            </div>
        </div>
    );
};

export default CitiesEditPage;