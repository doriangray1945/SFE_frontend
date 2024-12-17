import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { api } from '../../api';
import { updateUser } from '../../slices/userSlice'; 

const UserProfilePage = () => {
    const dispatch = useDispatch();

    const id = useSelector((state: RootState) => state.user.id);
    const email = useSelector((state: RootState) => state.user.email);
    const password = useSelector((state: RootState) => state.user.password);
    const username = useSelector((state: RootState) => state.user.username);
    const first_name = useSelector((state: RootState) => state.user.first_name);
    const last_name = useSelector((state: RootState) => state.user.last_name);
    const is_staff = useSelector((state: RootState) => state.user.is_staff);
    const is_superuser = useSelector((state: RootState) => state.user.is_superuser);
    const date_joined = useSelector((state: RootState) => state.user.date_joined);

    const [newPassword, setNewPassword] = useState(password || '');
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
            const updatedUserData = {
                email: newEmail,
                password: newPassword,
                first_name: first_name,
                last_name: last_name,
                date_joined: date_joined,
                username: username,
                is_staff: is_staff,
                is_superuser: is_superuser
            };

            const response = await api.user.userUpdateUserUpdate(id.toString(), updatedUserData);

            if (response) {
                dispatch(updateUser({ password: newPassword }));
                alert('Пароль успешно обновлен');
            }
        } catch (error) {
            console.error('Ошибка при изменении пароля:', error);
            setError('Не удалось обновить пароль');
        }
    };

    const handleEmailChange = async () => {
        if (!id) {
            setError('ID пользователя не найдено');
            return;
        }

        try {
            const updatedUserData = {
                email: newEmail,
                password: newPassword,
                first_name: first_name,
                last_name: last_name,
                date_joined: date_joined,
                username: username,
                is_staff: is_staff,
                is_superuser: is_superuser
            };

            const response = await api.user.userUpdateUserUpdate(id.toString(), updatedUserData);
            
            if (response) {
                dispatch(updateUser({ email: newEmail }));
                alert('Email успешно обновлен');
              }
        } catch (error) {
            console.error('Ошибка при изменении email:', error);
            setError('Не удалось обновить email');
        }
    };

    return (
        <div className="container mx-auto mt-10 px-4">
            <h2 className="text-2xl font-semibold mb-4">Личный кабинет</h2>

            {error && <div className="bg-red-500 text-white p-4 rounded">{error}</div>}

            <div className="bg-[#1A1D2B] p-6 rounded-md">
                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Данные пользователя</h3>
                    <div className="mb-4">
                        <div className="flex items-center">
                            <label className="text-gray-300">Имя пользователя:</label>
                            <span className="ml-4 text-gray-400">{username}</span>
                        </div>
                        <div className="flex items-center mt-4">
                            <label className="text-gray-300">Email:</label>
                            <input
                                type="email"
                                placeholder={email}
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="ml-4 px-4 py-2 text-red-800 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <button
                            onClick={handleEmailChange}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Сохранить EMail
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Смена пароля</h3>
                    <div className="flex items-center mt-4">
                        <label className="text-gray-300">Новый пароль:</label>
                        <input
                            type="password"
                            placeholder={password}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="ml-4 px-4 py-2 text-red-800 rounded-md"
                        />
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={handlePasswordChange}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Изменить пароль
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        onClick={handleEmailChange}
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                    >
                        Изменить email
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
