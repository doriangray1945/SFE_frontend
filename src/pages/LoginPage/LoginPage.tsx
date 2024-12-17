import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../slices/userSlice'; 
import Header from "../../components/Header/Header";
import { api } from '../../api';
import { User } from '../../api/Api'


const LoginPage: React.FC = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<User>({ username: '', password: ''});
    const [error, setError] = useState<string | null>(null);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
      
        if (formData.username && formData.password) {
          try {
            const userData = await api.login.loginCreate({ username: formData.username, password: formData.password });
            console.log(userData.data);
      
            if (userData.data.username) {
              dispatch(
                loginUser({
                  id: userData.data.id,
                  username: userData.data.username,
                  password: userData.data.password,
                  is_staff: userData.data.is_staff,
                  is_superuser: userData.data.is_superuser,
                  email: userData.data.email,
                  first_name: userData.data.first_name,
                  last_name: userData.data.last_name,
                  date_joined: userData.data.date_joined 
                })
              );
              console.log('Авторизация успешна');
            } else {
              console.error('Не удалось авторизоваться: ответ сервера некорректен');
              setError('Ответ сервера некорректен');
            }
          } catch (error) {
            // Обработка ошибок
            console.error('Ошибка авторизации');
            setError('Ошибка авторизации');
          }
        } else {
          setError('Заполните все поля');
        }
    };
      

    return (
        <Container className="mt-5">
        <Header/>
        <h2>Вход</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
            <Form.Label>Имя пользователя</Form.Label>
            <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Введите имя пользователя"
            />
            </Form.Group>
            <Form.Group controlId="password" className="mt-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Введите пароль"
            />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" onSubmit={ handleSubmit }>
                Войти
            </Button>
            </Form>
        </Container>
    );
};

export default LoginPage;
