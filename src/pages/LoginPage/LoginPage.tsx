import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../components/Header/Header";
import { loginUserAsync } from '../../slices/userSlice';
import { User } from '../../api/Api'
import { AppDispatch, RootState } from '../../store';


const LoginPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState<User>({ username: '', password: ''});
    const error = useSelector((state: RootState) => state.user.error); // Получаем ошибку из Redux

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
    
      if (formData.username && formData.password) {
        dispatch(loginUserAsync({ username: formData.username, password: formData.password }));
      } else {
        console.error('Заполните все поля');
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
