import Container from 'react-bootstrap/Container';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Header from '../../Header/Header';
import Input from '../../UI/input/input';
import { login } from '../../../actions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = (event) => {
        event.preventDefault();
        const user = {
            email,
            password,
        };
        console.log(user);
        dispatch(login(user, navigate));
    };
    return (
        <>
            <Header />
            <Container>
                <Row
                    style={{
                        marginTop: '50px',
                    }}
                >
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={(event) => {}}>
                            <Input
                                label={'Email'}
                                placeholder={'Enter Email'}
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />

                            <Input
                                label={'Password'}
                                placeholder={'Enter Password'}
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />

                            <Button
                                variant="primary"
                                type="submit"
                                onClick={(event) => {
                                    userLogin(event);
                                }}
                            >
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </>
    );
}
export default SignIn;
