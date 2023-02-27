import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Header from '../../Header/Header';
import Input from '../../UI/input/input';
import { useState } from 'react';
import { register } from '../../../actions/user.action';
import { useDispatch } from 'react-redux';
function SignUp() {
    const dispatch = useDispatch();
    const [inforUser, setInforUser] = useState({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
    });
    console.log(inforUser);
    const registerUser = (event) => {
        event.preventDefault();
        dispatch(register(inforUser));
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
                    <Col md={6}>
                        <Input
                            label={'First Name'}
                            placeholder={'Enter First Name'}
                            value={inforUser.firstName}
                            onChange={(event) => {
                                setInforUser({
                                    ...inforUser,
                                    firstName: event.target.value,
                                });
                            }}
                        />

                        <Input
                            label={'Last Name'}
                            placeholder={'Enter Last Name'}
                            value={inforUser.lastName}
                            onChange={(event) => {
                                setInforUser({
                                    ...inforUser,
                                    lastName: event.target.value,
                                });
                            }}
                        />
                    </Col>
                    <Col md={6}>
                        <Input
                            label={'Email'}
                            placeholder={'Enter Email'}
                            value={inforUser.email}
                            onChange={(event) => {
                                setInforUser({
                                    ...inforUser,
                                    email: event.target.value,
                                });
                            }}
                        />

                        <Input
                            label={'Password'}
                            placeholder={'Enter Password'}
                            value={inforUser.password}
                            onChange={(event) => {
                                setInforUser({
                                    ...inforUser,
                                    password: event.target.value,
                                });
                            }}
                        />
                    </Col>
                    <Form>
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={(event) => {
                                registerUser(event);
                            }}
                        >
                            Submit
                        </Button>
                    </Form>
                </Row>
            </Container>
            <ToastContainer />
        </>
    );
}
export default SignUp;
