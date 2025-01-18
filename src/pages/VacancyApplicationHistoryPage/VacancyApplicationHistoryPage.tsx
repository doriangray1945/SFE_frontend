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
    const [isDataLoaded, setIsDataLoaded] = useState(false);

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
        dispatch(fetchVacancyApplicationList({
            status: statusFilter || undefined,
            date_submitted_start: startDate || undefined,
            date_submitted_end: endDate || undefined,
            page,
            limit: ITEMS_PER_PAGE
        })).then(() => setIsDataLoaded(true));
    };

    // Смена статуса
    const handleStatusChange = async (appId: number, newStatus: number) => {
        try {
            await dispatch(fetchVacancyApplication({ appId: appId.toString(), status: newStatus }));
            fetchApplications(page);
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

    // Обработчик прокрутки
    const handleScroll = () => {
        // Проверяем, что прокрутили до конца страницы (вниз)
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1) {
            if (applications.length % ITEMS_PER_PAGE === 0) { // Предотвращаем дублирование запросов
                setPage((prevPage) => {
                    const nextPage = prevPage + 1;
                    fetchApplications(nextPage); // Загружаем следующую страницу
                    return nextPage;
                });
            }
        }

        // Проверяем, что прокрутили до верха страницы (вверх)
        if (window.scrollY === 0 && page > 1) {
            setPage((prevPage) => {
                const prevPageNum = prevPage - 1;
                fetchApplications(prevPageNum); // Загружаем предыдущую страницу
                return prevPageNum;
            });
        }
    };

    useEffect(() => {
        setPage(1);
    }, [statusFilter, startDate, endDate, creatorFilter]);

    const scrollToMiddle = () => {
        const middle = (document.documentElement.scrollHeight - window.innerHeight) / 2;
        window.scrollTo(0, middle); // Устанавливаем прокрутку в середину
    };

    useEffect(() => {
        fetchApplications(page);
        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page, statusFilter, startDate, endDate, creatorFilter]);

    useEffect(() => {
        if (isDataLoaded) { 
            scrollToMiddle();
        }
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
                                    <th>Требования</th>
                                    <th>Обязанности</th>
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
                                        <td>{application.vacancy_requirements}</td>
                                        <td>{application.vacancy_responsibilities}</td>
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
                </div>
            </div>
        </div>
    );
};

export default VacancyApplicationHistoryPage;
