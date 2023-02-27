import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../Header/Header';
import Layout from '../../Layout/Layout';
import styles from './category.module.scss';
import { addCategory, categoryAction } from '../../../actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './categogy.css';
import Input from '../../UI/input/input';
import { ToastContainer } from 'react-toastify';
import Model from '../../../model/model';
import CheckboxTree from 'react-checkbox-tree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckSquare,
    faFile,
    faFolderOpen,
    faMinusSquare,
    faPlusSquare,
    faSquare,
} from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faChevronRight, faFolder } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const Category = () => {
    const token = useSelector((state) => state.auth.token);
    const categories = useSelector((state) => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [categoryList, setCategoryList] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpaned] = useState([]);
    const [updateShow, setUpdateShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleUpdateshow = () => setUpdateShow(true);
    const handleUpdateClose = () => setUpdateShow(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(categoryAction());
    }, []);
    const listCategory =
        categories.category && categories.loading === false ? (
            categories.category.map((item, index) => {
                return (
                    <div key={index}>
                        {item.name}
                        {item.children && item.children.length > 0
                            ? item.children.map((child, index) => {
                                  return (
                                      <li className={cx('categoryChild')} key={index}>
                                          {child.name}
                                      </li>
                                  );
                              })
                            : ''}
                    </div>
                );
            })
        ) : (
            <Spinner animation="border" variant="primary" />
        );
    const createCategoryList = (categories, option = []) => {
        for (let categogy of categories) {
            option.push({
                value: categogy._id,
                name: categogy.name,
                parentId: categogy.parentId,
            });
            if (categogy.children && categogy.children.length > 0) {
                createCategoryList(categogy.children, option);
            }
        }
        return option;
    };
    const renderCategory = (categories) => {
        let myCategories = [];
        for (let cat of categories) {
            myCategories.push({
                value: cat._id,
                label: cat.name,
                children: renderCategory(cat.children),
            });
        }
        return myCategories;
    };
    const handleClose = () => {
        // event.preventDefault();
        setShow(false);
    };
    const handleCreateCategory = () => {
        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', categoryList);
        form.append('categoryImage', categoryImage);
        console.log(form);
        dispatch(addCategory(form, token));
        setCategoryName('');
        setCategoryList('');
        handleClose();
    };
    const updateCategory = () => {
        setUpdateShow(true);
        const createCategory = createCategoryList(categories.category ? categories.category : '');
        console.log(createCategory);
        const categoryArray = [];
        const expandedArray = [];
        checked.length > 0 &&
            checked.forEach((categogyId) => {
                const resultCategory = createCategory.find((categoriesId) => {
                    return categoriesId.value == categogyId;
                });
                resultCategory && categoryArray.push(resultCategory);
            });
        expanded.length > 0 &&
            expanded.forEach((categogyId) => {
                const resultCategory = createCategory.find((categoriesId) => {
                    return categogyId == categoriesId.value;
                });
                resultCategory && expandedArray.push(resultCategory);
            });
        console.log(checked);
        console.log(categoryArray);
        console.log(expandedArray);
    };
    return (
        <Layout sideBar={true}>
            <Col className={cx('container')} xs={10}>
                <div className={cx('container__Item')}>
                    <div className={cx('Title__Category')}>
                        <h3>Category</h3>
                        <div>
                            <Button variant="primary" onClick={handleShow}>
                                Add
                            </Button>
                            <Button
                                style={{
                                    backgroundColor: '#333',
                                }}
                                variant="dark"
                                onClick={updateCategory}
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                    {/* {listCategory} */}
                    <CheckboxTree
                        nodes={renderCategory(categories.category ? categories.category : '')}
                        checked={checked}
                        expanded={expanded}
                        onCheck={(checked) => setChecked({ value: checked })}
                        onExpand={(expanded) => setExpaned({ value: expanded })}
                        icons={{
                            expandClose: (
                                <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon={faChevronRight} />
                            ),
                            expandOpen: (
                                <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon={faChevronDown} />
                            ),
                            // expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon={faPlusSquare} />,
                            // collapseAll: (
                            //     <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon={faMinusSquare} />
                            // ),
                            parentClose: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon={faFolder} />,
                            parentOpen: (
                                <FontAwesomeIcon className="rct-icon rct-icon-parent-open" icon={faFolderOpen} />
                            ),
                            leaf: <FontAwesomeIcon className="rct-icon rct-icon-leaf-close" icon={faFile} />,
                        }}
                    />
                </div>
                <Model
                    title={'Thêm Danh Mục'}
                    show={show}
                    handleClose={handleClose}
                    handleShow={handleShow}
                    handleCreate={handleCreateCategory}
                >
                    <Input
                        value={categoryName}
                        placeholder={'Tên loại sản phẩm'}
                        label={'Tên sản phẩm'}
                        onChange={(event) => {
                            setCategoryName(event.target.value);
                        }}
                    />
                    <Form.Select
                        aria-label="Default select example"
                        onChange={(event) => {
                            setCategoryList(event.target.value);
                        }}
                    >
                        <option>Chọn loại sản phẩm</option>
                        {createCategoryList(categories.category ? categories.category : '').map((item, index) => {
                            return (
                                <option value={item.value} key={index}>
                                    {item.name}
                                </option>
                            );
                        })}
                    </Form.Select>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Hình ảnh</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(event) => {
                                setCategoryImage(event.target.files[0]);
                            }}
                        />
                    </Form.Group>
                </Model>
            </Col>
            <Col className={cx('container')} xs={10}>
                <div className={cx('container__Item')}>
                    <div className={cx('Title__Category')}>
                        <h3>Category</h3>
                        <div>
                            <Button variant="primary" onClick={handleShow}>
                                Add
                            </Button>
                            <Button
                                style={{
                                    backgroundColor: '#333',
                                }}
                                variant="dark"
                                onClick={handleUpdateshow}
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                    {/* {listCategory} */}
                    <CheckboxTree
                        nodes={renderCategory(categories.category ? categories.category : '')}
                        checked={checked}
                        expanded={expanded}
                        onCheck={(checked) => setChecked({ checked })}
                        onExpand={(expanded) => setExpaned({ expanded })}
                        icons={{
                            // check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon={faCheckSquare} />,
                            // uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={faSquare} />,
                            // halfCheck: (
                            //     <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon={faCheckSquare} />
                            // ),
                            expandClose: (
                                <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon={faChevronRight} />
                            ),
                            expandOpen: (
                                <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon={faChevronDown} />
                            ),
                            // expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon={faPlusSquare} />,
                            // collapseAll: (
                            //     <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon={faMinusSquare} />
                            // ),
                            parentClose: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon={faFolder} />,
                            parentOpen: (
                                <FontAwesomeIcon className="rct-icon rct-icon-parent-open" icon={faFolderOpen} />
                            ),
                            leaf: <FontAwesomeIcon className="rct-icon rct-icon-leaf-close" icon={faFile} />,
                        }}
                    />
                </div>
                {show ? (
                    <Model
                        title={'Thêm Danh Mục'}
                        show={show}
                        handleClose={handleClose}
                        handleShow={handleShow}
                        handleCreate={handleCreateCategory}
                    >
                        <Input
                            value={categoryName}
                            placeholder={'Tên loại sản phẩm'}
                            label={'Tên sản phẩm'}
                            onChange={(event) => {
                                setCategoryName(event.target.value);
                            }}
                        />
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(event) => {
                                setCategoryList(event.target.value);
                            }}
                        >
                            <option>Chọn loại sản phẩm</option>
                            {createCategoryList(categories.category ? categories.category : '').map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Hình ảnh</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(event) => {
                                    setCategoryImage(event.target.files[0]);
                                }}
                            />
                        </Form.Group>
                    </Model>
                ) : (
                    ''
                )}
            </Col>
            <ToastContainer />
            <Model
                title={'Cập nhật danh mục'}
                show={updateShow}
                handleClose={handleUpdateClose}
                handleShow={handleUpdateshow}
                // handleCreate={handleCreateCategory}
            >
                <Row className={'containerCol'}>
                    <Col className={'containerCol__Item'}>
                        <Input value={categoryName} placeholder={'Tên loại sản phẩm'} onChange={(event) => {}} />
                    </Col>
                    <Col>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(event) => {
                                setCategoryList(event.target.value);
                            }}
                        >
                            <option>Chọn loại sản phẩm</option>
                            {createCategoryList(categories.category ? categories.category : '').map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(event) => {
                                setCategoryList(event.target.value);
                            }}
                        >
                            <option>Type</option>
                            <option value={'store'}>Store</option>
                            <option value={'product'}>Product</option>
                            <option value={'page'}>Page</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className={'containerCol'}>
                    <Col className={'containerCol__Item'}>
                        <Input value={categoryName} placeholder={'Tên loại sản phẩm'} onChange={(event) => {}} />
                    </Col>
                    <Col>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(event) => {
                                setCategoryList(event.target.value);
                            }}
                        >
                            <option>Chọn loại sản phẩm</option>
                            {createCategoryList(categories.category ? categories.category : '').map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(event) => {
                                setCategoryList(event.target.value);
                            }}
                        >
                            <option>Type</option>
                            <option value={'store'}>Store</option>
                            <option value={'product'}>Product</option>
                            <option value={'page'}>Page</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Model>
        </Layout>
    );
};
export default Category;
