import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Header from "../../components/Header/Header";
import { api } from '../../api';
import { User } from '../../api/Api';
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from '../../../Routes';


const RegisterPage: React.FC = () => {

  const [formData, setFormData] = useState<User>({
    username: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (formData.username && formData.password) {
      try {
        const response = await api.user.userCreate({ 
          username: formData.username, 
          password: formData.password 
        });
        
        // Обработка успешной регистрации
        if (response) {
          setSuccessMessage('Регистрация успешна! Пожалуйста, войдите.');
          setError(null); 
        }
      } catch (error) {
        setError('Ошибка регистрации. Попробуйте снова.');
      }
    } else {
      setError('Заполните все поля');
    }
  };

  return (
    <div>
      <Header />
      <div className="container-2">
        <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.REGISTER, path: ROUTES.REGISTER }]} />
        <div className="cities-title">
            <h1>Добро пожаловать!</h1>
        </div>
        <div className="container-3">
          <div className="login-container">
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
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
              <Button variant="primary" type="submit" className="enter-button">
                Зарегистрироваться
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
