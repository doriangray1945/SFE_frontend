import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../slices/userSlice'; 
import { Login } from '../../modules/userApi';

interface FormData {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formData.username && formData.password) {
            Login(formData.username, formData.password)
                .then(() => {
                    dispatch(loginUser(formData)); // Действие Redux
                })
        } else {
            setError('Заполните все поля');
        }
    };

    return (
        <Container className="mt-5">
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
