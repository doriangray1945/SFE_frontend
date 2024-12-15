import { useDispatch } from 'react-redux'; 
import { logoutUser } from '../slices/userSlice'; 

export interface User {
  id: number, 
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  date_joined: string,
  username: string,
  is_staff: boolean,
  is_superuser: boolean
}

export const Login = async (username: string, password: string): Promise<User> => {
  const response = await fetch(`/api/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Ошибка авторизации');
  }

  return data.data;
};


export const Logout = async (): Promise<void> => {
  const dispatch = useDispatch();

  try {
    const response = await fetch(`/api/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      dispatch(logoutUser());
      console.log('Выход из системы выполнен успешно');
    } else {
      const errorData = await response.json();
      console.error('Ошибка на сервере:', errorData.message);
      throw new Error(errorData.message || 'Не удалось выполнить выход');
    }
  } catch (error) {
    console.error('Ошибка при выходе из системы:', error);
  }
};