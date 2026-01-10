import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function MainNavbar() {
    return (
        <Navbar fixed='top' className='mb-3' bg='dark' data-bs-theme='dark'>
            <Container>
                <Nav>
                    <LinkContainer to="/algebra">
                        <Nav.Link>Algebra</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/chemistry">
                        <Nav.Link>Chemistry</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default MainNavbar