import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from '../../Routes';
import { Button, Col, Container, Row } from "react-bootstrap";

export const HomePage: FC = () => {
  return (
    <Container>
      <Row>
        <Col md={6}>
          <h1>Сервис для работодателей</h1>
          <p>
            ПРОМО
          </p>
          <Link to={ROUTES.CITIES}>
            <Button variant="primary">Доступные города для размещения вакансии</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};