import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useTheme } from '../context/ThemeProvider'

function MainNavbar() {
    const { theme, setTheme } = useTheme()

    return (
        <Navbar fixed='top' expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='me-auto'>
                        <NavDropdown title="Math">
                            <LinkContainer to="/math/algebra">
                                <NavDropdown.Item>Algebra</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                        <NavDropdown title="Science">
                            <LinkContainer to="/science/chemistry">
                                <NavDropdown.Item>Chemistry</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Theme" align="end">
                            <NavDropdown.Item
                                onClick={() => { setTheme('light') }}
                                active={theme === 'light'}
                            >
                                Light
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={() => { setTheme('dark') }}
                                active={theme === 'dark'}
                            >
                                Dark
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={() => { setTheme('dark-purple') }}
                                active={theme === 'dark-purple'}
                            >
                                Dark Purple
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={() => { setTheme('ocean-blue') }}
                                active={theme === 'ocean-blue'}
                            >
                                Ocean Blue
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={() => { setTheme('forest-green') }}
                                active={theme === 'forest-green'}
                            >
                                Forest Green
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={() => { setTheme('invert') }}
                                active={theme === 'invert'}
                                disabled
                            >
                                Invert
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MainNavbar