import Accordion from 'react-bootstrap/Accordion'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import { useMolarMass } from '../../hooks/useMolarMass'


function MolarMassCalculator() {
    const { userFormula, setFormula, molarMass, error } = useMolarMass()

    return (
        <Accordion.Item eventKey='0'>
            <Accordion.Header>Parse Chemical Formula</Accordion.Header>
            <Accordion.Body>
                <Row xs="auto" className='mb-4'>
                    <Col className='col-form-label'>Formula</Col>
                    <Col xs="5">
                        <Form.Control
                            type="text"
                            value={userFormula}
                            onChange={(event) => {setFormula(event.target.value)}}
                        />
                    </Col>
                </Row>
                <Alert variant='success'>
                    <Row xs="auto">
                        <Col>Molar Mass: </Col>
                        <Col>
                            {molarMass !== null ? molarMass.toFixed(4) : "Calculating..."}
                        </Col>
                    </Row>
                </Alert>
                <Row>
                    {error && <Alert variant="danger">{error}</Alert>}
                </Row>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default MolarMassCalculator

