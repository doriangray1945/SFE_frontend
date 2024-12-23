import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { updateUserDataAsync } from '../../slices/userSlice';
import Header from "../../components/Header/Header";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS } from '../../../Routes';
import "./UserProfilePage.css"
import { Button, Alert } from 'react-bootstrap';

const UserProfilePage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const id = useSelector((state: RootState) => state.user.id);
    const email = useSelector((state: RootState) => state.user.email);
    const password = useSelector((state: RootState) => state.user.password);
    const username = useSelector((state: RootState) => state.user.username);

    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState(email || '');
    
    const [error, setError] = useState('');

    const handlePasswordChange = async () => {
        if (!newPassword || newPassword.length < 8) {
            setError('Пароль должен содержать хотя бы 8 символов.');
            return;
        }
        if (!id) {
            setError('ID пользователя не найдено');
            return;
        }
        try {
            dispatch(updateUserDataAsync({ id, password: newPassword, username })).unwrap();
            alert('Пароль успешно обновлен');
        } catch (error) {
            setError('Не удалось обновить пароль');
        }
    };

    const handleEmailChange = async () => {
        if (!id) {
            setError('ID пользователя не найдено');
            return;
        }
        try {
            await dispatch(updateUserDataAsync({ id, email: newEmail, username, password })).unwrap();
            alert('Email успешно обновлен');
        } catch (error) {
            setError(error as string);
        }
    };

    return (
        <div>
            <Header />
            <div className="container-2">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.PROFILE }]} />
                <div className="cities-title">
                    <h1>Личный кабинет</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                </div>
                <div className="profile-container">
                    <label className="username">Имя пользователя: </label>
                    <span className="username">{username}</span>
                    <div className="change-email">
                        <label className="email">Email: </label>
                        <input
                            type="email"
                            placeholder={email}
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="form-change"
                        />
                        <Button
                            onClick={handleEmailChange}
                            className="btn-change"
                        >
                            Сохранить EMail
                        </Button>
                    </div>
                    <div className="change-password">
                        <label className="email">Новый пароль:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-change"
                        />
                        <Button
                            onClick={handlePasswordChange}
                            className="btn-change"
                        >
                            Изменить пароль
                        </Button>
                    </div>
                </div>
            </div>
        </div> 
    );
};

export default UserProfilePage;
