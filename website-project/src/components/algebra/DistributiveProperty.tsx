import Accordion from "react-bootstrap/Accordion"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useState } from "react"

type Props = {
    'a': string
    'b': string
    'c': string
}

function DistributiveProperty() {
    const [values, setValues] = useState<Props>({'a': "1", 'b': "2", 'c': "3"})

    const {a, b, c} = values

    const numA = Number(a) || 0
    const numB = Number(b) || 0
    const numC = Number(c) || 0

    const leftSide = numA * (numB + numC)
    const rightSide = numA * numB + numA * numC

    return (
        <Accordion.Item eventKey="0">
            <Accordion.Header>Distributive Property</Accordion.Header>
            <Accordion.Body>
                <h4 className="mb-4">a * (b + c) = a * b + a * c</h4>
                <Row xs="auto" className="mb-4">
                    <Col className="col-form-label">a</Col>
                    <Col xs="2">
                        <Form.Control
                            type="text"
                            value={a}
                            onChange={(event) => {setValues({...values, 'a': event.target.value})}}
                        />
                    </Col>
                    <Col className="col-form-label">b</Col>
                    <Col xs="2">
                        <Form.Control
                            type="text"
                            value={b}
                            onChange={(event) => {setValues({...values, 'b': event.target.value})}}
                        />
                    </Col>
                    <Col className="col-form-label">c</Col>
                    <Col xs="2">
                        <Form.Control
                            type="text"
                            value={c}
                            onChange={(event) => {setValues({...values, 'c': event.target.value})}}
                        />
                    </Col>
                </Row>
                <p>
                    a * (b + c) = {numA} * ({numB} + {numC}) = {leftSide}
                </p>
                <p>
                    a * b + a * c = {numA} * {numB} + {numA} * {numC} = {rightSide}
                </p>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default DistributiveProperty