import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../Routes';
import { api } from '../../api';
import Header from "../../components/Header/Header";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS } from '../../../Routes';


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

    const fetchApplications = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await api.vacancyApplications.vacancyApplicationsList();
            setApplications(response.data);
        } catch (error) {
            setError('Ошибка при загрузке заявок');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <div>
            <Header />
            <div className="container-2">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.VACANCYAPPLICATION }]} />    
                <div className='container-3'>
                    <div className="min-h-screen bg-[#060F1E] text-gray-200">

                        <div className="mx-auto mt-10 px-4">
                            <h2 className="cities-title">Мои заявки</h2>

                            {loading ? (
                                <div className="flex justify-center items-center h-72">
                                    <div className="loader border-t-4 border-b-4 border-white w-12 h-12 rounded-full animate-spin"></div>
                                </div>
                            ) : error ? (
                                <div className="bg-red-500 text-white p-4 rounded">{error}</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full table-auto bg-[#1A1D2B] text-gray-300 border-collapse">
                                        <thead className="bg-[#222639]">
                                            <tr>
                                                <th className="px-4 py-2">Номер заявки</th>
                                                <th className="px-4 py-2">Статус</th>
                                                <th className="px-4 py-2">Создатель</th>
                                                <th className="px-4 py-2">Дата создания</th>
                                                <th className="px-4 py-2">Дата формирования</th>
                                                <th className="px-4 py-2">Дата завершения</th>
                                                <th className="px-4 py-2">Действия</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {applications.map((application) => (
                                                <tr key={application.app_id} className="border-b border-gray-700 hover:bg-[#333A4E]">
                                                    <td className="px-4 py-2 text-center">{application.app_id}</td>
                                                    <td className="px-4 py-2 text-center">{application.status}</td>
                                                    <td className="px-4 py-2 text-center">{application.creator}</td>
                                                    <td className="px-4 py-2 text-center">
                                                        {new Date(application.date_created).toLocaleString()}
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        {application.date_submitted ? new Date(application.date_submitted).toLocaleString() : ''}
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        {application.date_completed ? new Date(application.date_completed).toLocaleString() : ''}
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        <Link to={`${ROUTES.VACANCYAPPLICATION}/${application.app_id}`}>
                                                            Просмотр
                                                        </Link>
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
            </div>
        </div>
    );
};

export default VacancyApplicationHistoryPage;
