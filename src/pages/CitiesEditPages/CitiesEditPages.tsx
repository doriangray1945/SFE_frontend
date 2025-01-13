import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './CitiesEditPages.css';
import { ROUTES, ROUTE_LABELS } from '../../../Routes';
import { AppDispatch, RootState } from '../../store';
import Header from "../../components/Header/Header";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { Alert } from 'react-bootstrap';
import { getCitiesList, deleteCity, setCities } from '../../slices/citiesSlice';
import { Image } from "react-bootstrap";
import defaultImage from "../../static/images/DefaultImage.jpg";

const CitiesEditPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { cities, error } = useSelector((state: RootState) => state.cities);
    
    const isSuperUser = useSelector((state: RootState) => state.user.is_superuser);

    const handleFetchCities = async () => {
        if (!isSuperUser) {
            navigate(`${ROUTES.FORBIDDEN}`);
            return
        }
        dispatch(getCitiesList());
      };
    
    useEffect(() => {
        handleFetchCities();
    }, [dispatch]);

    const handleAddCity = async () => {
        navigate(`${ROUTES.CITIESCREATE}`);
    };

    const handleDeleteCity = async (cityId: number) => {
        try {
            await dispatch(deleteCity(cityId.toString()));
            dispatch(setCities(cities.filter(city => city.city_id !== cityId)));
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
                        <button onClick={handleAddCity} className='login-btn'>Добавить город</button>
                        <div style={{ height: '15vh'}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CitiesEditPage;