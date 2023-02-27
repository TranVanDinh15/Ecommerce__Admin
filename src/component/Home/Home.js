import { Card, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Header from '../Header/Header';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
const cx = classNames.bind(styles);
function Home() {
    return (
        <Layout sideBar={true}>
            <Col className={cx('container')} sm={8}>
                <div className={cx('container__Item')}>
                    <div className={cx('Title__Category')}>
                        <h3>Category</h3>
                    </div>
                </div>
            </Col>
        </Layout>
    );
}
export default Home;
