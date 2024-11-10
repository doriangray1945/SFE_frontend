import { FC } from 'react'
import { Col, Row, Button } from "react-bootstrap";
import searchImg from "../../static/images/search-image.png";
import './InputField.css'

interface Props {
    value: string
    setValue: (value: string) => void
    onSubmit: () => void
    loading?: boolean
}

const InputField: FC<Props> = ({ value, setValue, onSubmit, loading }) => (
    <div className="search-bar">
        <Row>
            <Col md={8}>
                <div className="search-input">
                    <img src={searchImg} alt="Search Icon" className="search-icon" />
                    <input
                        type="text"
                        placeholder="Поиск"
                        value={value}
                        onChange={(event => setValue(event.target.value))}
                        className="inp-text"
                    />
                </div>
            </Col>
            <Col md={4}>
                <Button disabled={loading} className="search-button" onClick={onSubmit}>
                    Найти
                </Button>
            </Col>
        </Row>
    </div>
)

export default InputField