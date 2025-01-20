import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../Routes';
import Header from "../../components/Header/Header";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS } from '../../../Routes';
import { Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useNavigate } from "react-router-dom";
import { fetchVacancyApplication, fetchVacancyApplicationList, setFilteredApplications } from '../../slices/VacancyApplicationSlice';

const ITEMS_PER_PAGE = 50; // Количество записей на одну страницу

const VacancyApplicationHistoryPage = () => {
    const [statusFilter, setStatusFilter] = useState<number>(NaN);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [creatorFilter, setCreatorFilter] = useState<string>('');

    const [page, setPage] = useState<number>(1); // Добавляем состояние для текущей страницы
    const [isLoading, setIsLoading] = useState(false); // Флаг загрузки
    const [hasMoreData, setHasMoreData] = useState(true); // Флаг наличия данных
    
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const isSuperUser = useSelector((state: RootState) => state.user.is_superuser);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { applications, error } = useSelector((state: RootState) => state.vacancyApplication);


    const fetchApplications = async (page: number) => {
        if (!isAuthenticated) {
            navigate(`${ROUTES.FORBIDDEN}`);
            return;
        }

        if (isLoading || !hasMoreData) {
            return; // Не загружаем, если уже идет загрузка или все данные загружены
        }

        setIsLoading(true); // Устанавливаем флаг загрузки

        try {
            const response = await dispatch(fetchVacancyApplicationList({
                status: statusFilter || undefined,
                date_submitted_start: startDate || undefined,
                date_submitted_end: endDate || undefined,
                page,
                limit: ITEMS_PER_PAGE
            })).unwrap();  
    
            if (response && response.length < ITEMS_PER_PAGE) {
                setHasMoreData(false); // Нет больше данных
            } else {
                setHasMoreData(true); // Если данные есть, продолжаем пагинацию
            }

        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        } finally {
            setIsLoading(false); // Сбрасываем флаг загрузки
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    // Смена статуса
    const handleStatusChange = async (appId: number, newStatus: number) => {
        try {
            // Делаем запрос на обновление статуса и получаем новый duration_days
            const response = await dispatch(fetchVacancyApplication({ appId: appId.toString(), status: newStatus }));
            
            // Используем значение duration_days из ответа
            const durationDays = response.payload;
    
            const updatedApplications = applications.map((application) => {
                if (application.app_id === appId) {
                    return { 
                        ...application, 
                        status: newStatus, 
                        duration_days: durationDays // обновляем duration_days
                    };
                }
                return application;
            });
    
            // Обновляем состояние с новым списком заявок
            dispatch(setFilteredApplications(updatedApplications));
    
        } catch (error) {
            alert('Ошибка при обновлении статуса заявки');
        }
    };    


    // Фильтрация по создателю на фронтенде
    const filterApplications = () => {
        let filtered = applications;
        if (creatorFilter) {
            filtered = filtered.filter((item) =>
                item.creator.toLowerCase().includes(creatorFilter.toLowerCase())
            );
        }
        dispatch(setFilteredApplications(filtered));
    };

    useEffect(() => {
        setPage(1);
        setHasMoreData(true);
        fetchApplications(1);
    }, [statusFilter, startDate, endDate, creatorFilter]);

    useEffect(() => {
        fetchApplications(page);
    }, [page]);

    useEffect(() => {
        filterApplications();
    }, [creatorFilter]);

    
    return (
        <div>
            <Header />
            <div className="container-2">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.VACANCYAPPLICATION, path: ROUTES.VACANCYAPPLICATION }]} />
                <div className="cities-title">
                    <h1>Заявки на создание вакансий</h1>
                </div>
                <div className='page-container'>
                    {/* Filters */}
                    <div className="filters mb-4">
                        <label>
                            Статус:
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(Number(e.target.value) || NaN)}
                            >
                                <option value="">Все</option>
                                <option value="3">Сформирована</option>
                                <option value="4">Завершена</option>
                                <option value="5">Отклонена</option>
                            </select>
                        </label>

                        <label>
                            Дата начала:
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </label>

                        <label>
                            Дата окончания:
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </label>

                        <label>
                            Создатель:
                            <input
                                type="text"
                                value={creatorFilter}
                                onChange={(e) => setCreatorFilter(e.target.value)}
                            />
                        </label>
                    </div>

                    <div>
                        {error && <Alert variant="danger" style={{ width: '15vw' }}>{error}</Alert>}
                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Номер заявки</th>
                                    <th>Статус</th>
                                    <th>Создатель</th>
                                    <th>Дата формирования</th>
                                    <th>Название вакансии</th>
                                    <th>Длительность</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((application) => (
                                    <tr key={application.app_id}>
                                        <td>{application.app_id}</td>
                                        <td className={(application.status === 3 || application.status === 4) ? "status-completed" : "status-pending"}>
                                            {application.status === 3 ? 'Сформирован' : application.status === 4 ? 'Завершен' : 'Отклонен'}
                                        </td>
                                        <td>{application.creator}</td>
                                        <td>{application.date_submitted ? new Date(application.date_submitted).toLocaleString() : '—'}</td>
                                        <td>{application.vacancy_name}</td>
                                        <td>{application.duration_days}</td>
                                        <td>
                                            <Link to={`${ROUTES.VACANCYAPPLICATION}/${application.app_id}`}>Просмотр</Link>
                                            {/* Change Status buttons */}
                                            {application.status !== 4 && application.status !== 5 && (isSuperUser) && (
                                                <div className="mt-2">
                                                    <button
                                                        onClick={() => handleStatusChange(application.app_id!, 4)}
                                                        className="edit-button"
                                                    >
                                                        Завершить
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(application.app_id!, 5)}
                                                        className="edit-button"
                                                    >
                                                        Отклонить
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Пагинация */}
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page <= 1}
                        >
                            Назад
                        </button>
                        <span>Страница {page} </span>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={!hasMoreData}
                        >
                            Вперед
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default VacancyApplicationHistoryPage;
