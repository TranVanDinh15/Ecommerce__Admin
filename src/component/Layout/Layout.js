import { Card, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Header from '../Header/Header';
import classNames from 'classnames/bind';
import styles from './Layout.module.scss';
import './Layout.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const cx = classNames.bind(styles);
function Layout({ sideBar, children }) {
    return (
        <div>
            <Header />
            {/* <Container> */}
            <Row className={cx('navBarWrapper')}>
                {sideBar ? (
                    <Col className={cx('sideBar')} xs={2}>
                        <li>
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link to={'/Category'}>Category</Link>
                        </li>
                        <li>
                            <Link to={'/Product'}>Product</Link>
                        </li>
                        <li>
                            <Link to={'/Order'}>Order</Link>
                        </li>
                    </Col>
                ) : (
                    ''
                )}
                {children}
            </Row>
            {/* </Container> */}
        </div>
    );
}
export default Layout;
