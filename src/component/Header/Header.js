import { Button, Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logOut } from '../../actions';
import './Header.css';
function Header() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const renderLoginInLink = () => {
        return (
            <Navbar.Collapse className="justify-content-end">
                <Button
                    as="input"
                    type="button"
                    value="Log out"
                    variant="light"
                    onClick={(event) => {
                        event.preventDefault();
                        dispatch(logOut());
                    }}
                />
            </Navbar.Collapse>
        );
    };
    const renderNoneLoginLink = () => {
        return (
            <Navbar.Collapse className="justify-content-end">
                <Button
                    as="input"
                    type="button"
                    value="Sign in"
                    variant="warning"
                    onClick={() => {
                        navigate('/signIn');
                    }}
                />
                {''}
                <Button
                    style={{
                        marginLeft: '10px',
                    }}
                    as="input"
                    type="button"
                    value="Sign up"
                    variant="info"
                    onClick={() => {
                        navigate('/signUp');
                    }}
                />{' '}
            </Navbar.Collapse>
        );
    };
    return (
        <>
            <Navbar
                bg={'dark'}
                variant="dark"
                style={{
                    width: '100%',
                    position: 'fixed',
                    top: '0',
                }}
            >
                <Container className="navBarContainer">
                    <Navbar.Brand href="/">Admin Dasboad</Navbar.Brand>
                    <Navbar.Toggle />
                    {token ? renderLoginInLink() : renderNoneLoginLink()}
                </Container>
            </Navbar>
        </>
    );
}
export default Header;
