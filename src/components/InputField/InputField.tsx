import { FC } from 'react'
import { Col, Row, Button } from "react-bootstrap";
import searchImg from "../../static/images/search-image.png";
import './InputField.css'
import favoriteImg from "../../static/images/favorites-btn.png"

interface Props {
    value: string
    setValue: (value: string) => void
    onSubmit: () => void
    loading?: boolean
}

const InputField: FC<Props> = ({ value, setValue, onSubmit, loading }) => (
    <div className="search-bar">
        <Row>
            <Col xs={7} sm={7} md={7}>
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
            <Col xs={3} sm={3} md={3}>
                <Button disabled={loading} className="search-button" onClick={onSubmit}>
                    Найти
                </Button>
            </Col>
            <Col xs={2} sm={2} md={2}>
                <a /*href="/"*/ className="btn-favorites">
                  <img src={favoriteImg} alt="Избранное" />
                  <span className="badge rounded-pill position-absolute">0</span>
                </a>
              </Col>
        </Row>
    </div>
)

export default InputField