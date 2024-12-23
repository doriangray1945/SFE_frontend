import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../components/Header/Header";
import { loginUserAsync } from '../../slices/userSlice';
import { User } from '../../api/Api'
import { AppDispatch, RootState } from '../../store';
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS } from '../../../Routes';
import "./LoginPage.css";


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

export default LoginPage;
