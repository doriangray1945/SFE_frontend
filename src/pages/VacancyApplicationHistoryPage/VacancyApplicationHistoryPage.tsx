import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../Routes';
import { api } from '../../api';
import Header from "../../components/Header/Header";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS } from '../../../Routes';
import './VacancyApplicationHistoryPage.css';
import { Alert } from 'react-bootstrap';


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
      <div className='container-2'>
        <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.VACANCYAPPLICATION, path: ROUTES.VACANCYAPPLICATION }]} />
        <h1 className="cities-title">Заявки на создание вакансий</h1>
        <div className="page-container">
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
