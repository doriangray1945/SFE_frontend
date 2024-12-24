import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../Routes';
import { api } from '../../api';
import Header from "../../components/Header/Header";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS } from '../../../Routes';
import { Alert } from 'react-bootstrap';


const POLLING_INTERVAL = 10000; // Poll every 10 seconds

const VacancyApplicationHistoryPage = () => {
    const [applications, setApplications] = useState<{ 
        app_id?: number; 
        status?: number; 
        date_created: string; 
        creator: string; 
        moderator?: string | null; 
        date_submitted?: string | null; 
        date_completed?: string | null; 
        vacancy_name?: string | null; 
        vacancy_responsibilities?: string | null; 
        vacancy_requirements?: string | null; 
        duration_days?: number | null; 
    }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Для фильтра
    const [statusFilter, setStatusFilter] = useState<number>(NaN); // Status filter
    const [startDate, setStartDate] = useState<string>(''); // Start date filter
    const [endDate, setEndDate] = useState<string>(''); // End date filter
    const [creatorFilter, setCreatorFilter] = useState<string>(''); // Creator filter


    const fetchApplications = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await api.vacancyApplications.vacancyApplicationsList({
                status: statusFilter || undefined,
                date_submitted_start: startDate || undefined,
                date_submitted_end: endDate || undefined
            });
            setApplications(response.data);
        } catch (error) {
            setError('Ошибка при загрузке заявок');
        } finally {
            setLoading(false);
        }
    };

    // Смена статуса
    const handleStatusChange = async (appId: number, newStatus: number) => {
        try {
            await api.vacancyApplications.vacancyApplicationsUpdateStatusAdminUpdate(appId.toString(), { status: newStatus });
            fetchApplications(); 
        } catch (error) {
            setError('Ошибка при обновлении статуса заявки');
        }
    };

    // Фильтрация по создателю на фронтенде
    const filterApplications = () => {
        let filtered = applications;
        if (creatorFilter) {
            filtered = filtered.filter((application) =>
                application.creator.toLowerCase().includes(creatorFilter.toLowerCase())
            );
        }
        setApplications(filtered);
    };

    useEffect(() => {
        fetchApplications();
        const intervalId = setInterval(() => {
            fetchApplications(); // Polling fetch
        }, POLLING_INTERVAL);

        return () => clearInterval(intervalId); 
    }, [statusFilter, startDate, endDate]);

    useEffect(() => {
        filterApplications();
    }, [creatorFilter]);

    return (
        <div>
            <Header />
            <div className="container-2">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.VACANCYAPPLICATION, path: ROUTES.VACANCYAPPLICATION }]} />
                <h1 className="cities-title">Заявки на создание вакансий</h1>
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
                                <option value="1">Черновик</option>
                                <option value="2">Удалена</option>
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

                    {loading ? (
                        <div className="loader-container">
                            <div className="loader"></div>
                        </div>
                    ) : error ? (
                        <div>
                            {error && <Alert variant="danger" style={{ width: '15vw'}}>{error}</Alert>}
                        </div>
                    ) : (
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Номер заявки</th>
                                        <th>Статус</th>
                                        <th>Создатель</th>
                                        <th>Дата создания</th>
                                        <th>Дата формирования</th>
                                        <th>Дата завершения</th>
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
                                            <td>{new Date(application.date_created).toLocaleString()}</td>
                                            <td>{application.date_submitted ? new Date(application.date_submitted).toLocaleString() : '—'}</td>
                                            <td>{application.date_completed ? new Date(application.date_completed).toLocaleString() : '—'}</td>
                                            <td>
                                                <Link to={`${ROUTES.VACANCYAPPLICATION}/${application.app_id}`}>Просмотр</Link>
                                                {/* Change Status buttons */}
                                                {application.status !== 4 && application.status !== 5 && (
                                                    <div className="mt-2">
                                                        <button
                                                            onClick={() => handleStatusChange(application.app_id!, 4)} // Set to "Завершена"
                                                            className="text-blue-500"
                                                        >
                                                            Завершить
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusChange(application.app_id!, 5)} // Set to "Отклонена"
                                                            className="ml-2 text-red-500"
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default VacancyApplicationHistoryPage;
