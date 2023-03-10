import classNames from 'classnames/bind';
import Header from '../../Header/Header';
import Layout from '../../Layout/Layout';
import styles from './product.module.scss';
import { Button, Col, Form, Modal, Spinner, Table } from 'react-bootstrap';
import { useState } from 'react';
import Input from '../../UI/input/input';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreateProduct, actionGetProduct, categoryAction } from '../../../actions';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import Model from '../../../model/model';
const cx = classNames.bind(styles);
const Product = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const categories = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = (event) => {
        setShow(false);
    };
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [productPicture, setProductPricture] = useState([]);
    const [detailProductShow, setDetailProductShow] = useState(false);
    const [detailProduct, setDetailProduct] = useState('');
    const handleCloseDetail = () => [setDetailProductShow(false)];
    const createCategoryList = (categories, option = []) => {
        for (let categogy of categories) {
            option.push({
                value: categogy._id,
                name: categogy.name,
            });
            if (categogy.children && categogy.children.length > 0) {
                createCategoryList(categogy.children, option);
            }
        }
        return option;
    };
    const handleCreateProduct = (event) => {
        const form = new FormData();
        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', category);
        for (let pic of productPicture) {
            form.append('productPicture', pic);
        }
        dispatch(actionCreateProduct(form, token));
        handleClose(event);
    };
    useEffect(() => {
        dispatch(categoryAction());
        dispatch(actionGetProduct());
    }, []);
    console.log(detailProduct);
    console.log(product.product);
    return (
        <Layout sideBar={true}>
            <Col className={cx('container')} xs={10}>
                <div className={cx('container__Item')}>
                    <div className={cx('Title__Category')}>
                        <h3>Product</h3>
                        <Button variant="primary" onClick={handleShow}>
                            Add
                        </Button>
                        <Model
                            title={'Th??m Danh M???c'}
                            show={show}
                            handleClose={handleClose}
                            handleShow={handleShow}
                            handleCreate={handleCreateProduct}
                        >
                            <Input
                                value={name}
                                placeholder={'T??n s???n ph???m'}
                                label={'T??n s???n ph???m'}
                                onChange={(event) => {
                                    setName(event.target.value);
                                }}
                            />
                            <Input
                                value={price}
                                placeholder={'Gi??'}
                                label={'Gi??'}
                                onChange={(event) => {
                                    setPrice(event.target.value);
                                }}
                            />
                            <Input
                                value={quantity}
                                placeholder={'S??? l?????ng'}
                                label={'S??? l?????ng'}
                                onChange={(event) => {
                                    setQuantity(event.target.value);
                                }}
                            />
                            <Input
                                value={description}
                                placeholder={'M?? t??? s???n ph???m'}
                                label={'M?? t??? s???n ph???m'}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                            />
                            <Form.Select
                                aria-label="Default select example"
                                onClick={(event) => {
                                    setCategory(event.target.value);
                                }}
                            >
                                <option>Ch???n lo???i s???n ph???m</option>
                                {createCategoryList(categories.category ? categories.category : '').map(
                                    (item, index) => {
                                        return (
                                            <option value={item.value} key={index}>
                                                {item.name}
                                            </option>
                                        );
                                    },
                                )}
                            </Form.Select>

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>H??nh ???nh</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(event) => {
                                        setProductPricture([...productPicture, event.target.files[0]]);
                                    }}
                                />
                            </Form.Group>
                        </Model>
                        <Model
                            title={'Chi ti???t s???n ph???m'}
                            show={detailProductShow}
                            handleClose={handleCloseDetail}
                            handleShow={handleShow}
                            // handleCreate={handleCreateProduct}
                        >
                            {detailProduct ? (
                                <>
                                    <div className={cx('Model__Item')}>
                                        <div className={cx('Model__Item__Name')}>
                                            <span>T??n s???n ph???m</span>
                                            <span>{detailProduct.name}</span>
                                        </div>
                                        <div className={cx('Model__Item__Name')}>
                                            <span>Gi??</span>
                                            <span>{detailProduct.price}</span>
                                        </div>
                                    </div>
                                    <div className={cx('Model__Item')}>
                                        <div className={cx('Model__Item__Name')}>
                                            <span>S??? l?????ng</span>
                                            <span>{detailProduct.quantity}</span>
                                        </div>
                                        <div className={cx('Model__Item__Name')}>
                                            <span>Ph??n lo???i</span>
                                            <span>{detailProduct.category.name}</span>
                                        </div>
                                    </div>
                                    <div className={cx('Model__Item')}>
                                        <div className={cx('Model__Item__Name')}>
                                            <span>M?? t???</span>
                                            <p>{detailProduct.description}</p>
                                        </div>
                                    </div>
                                    <div className={cx('Model__Item')}>
                                        <div className={cx('Model__Item__Image')}>
                                            {detailProduct.productPicture.map((item, index) => {
                                                return (
                                                    <img
                                                        key={index}
                                                        src={process.env.REACT_APP_SERVER_URL + item.img}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                ''
                            )}
                        </Model>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Description</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.product ? (
                                product.product.product.map((item, index) => {
                                    return (
                                        <tr
                                            onClick={() => {
                                                setDetailProductShow(true);
                                                setDetailProduct(item);
                                            }}
                                            key={index}
                                        >
                                            <td>{index}</td>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.description}</td>
                                            <td>{item.category.name}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <Spinner animation="border" variant="primary" />
                            )}
                        </tbody>
                    </Table>
                </div>
            </Col>
            <ToastContainer />
        </Layout>
    );
};
export default Product;
