import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { loginUserAsync } from '../../slices/userSlice';
import Header from "../../components/Header/Header";

const LoginPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState({ username: '', password: '' });
    const error = useSelector((state: RootState) => state.user.error);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formData.username && formData.password) {
            dispatch(loginUserAsync(formData)); // Отправляем 'thunk'
        }
    };

    return (
        <Container style={{ maxWidth: '100%', marginTop: '0' }}> 
            <Header/>
            <Container style={{ maxWidth: '400px', marginTop: '150px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Рады снова Вас видеть!</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username" style={{ marginBottom: '15px' }}>
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Введите имя пользователя"
                        />
                    </Form.Group>
                    <Form.Group controlId="password" style={{ marginBottom: '20px' }}>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Введите пароль"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ width: '100%' }}>
                        Войти
                    </Button>
                </Form>
            </Container>
        </Container>
    );
};

export default LoginPage;

/*
return (
        <div>
            <Header />
            <div className="container-2">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.LOGIN }]} />
                <div className="cities-title">
                    <h1>Рады снова Вас видеть!</h1>
                </div>
                <div className="container-3">
                    <div className="login-container">
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
                            <Form.Group controlId="password">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Введите пароль"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="enter-button">
                                Войти
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};
 */