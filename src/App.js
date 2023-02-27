import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './component/Home/Home';
import SignIn from './component/page/signIn/signIn';
import SignUp from './component/page/signUp/signUp';
import privateRouter from './HOC/privateRouter';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from './component/page/product/product';
import Order from './component/page/order/order';
import Category from './component/page/category/category';
import { categoryAction } from './actions';
function App() {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        privateRouter(navigate, token, location);
        // dispatch(categoryAction());
    }, []);
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/Product" element={<Product />} />
                <Route path="/Order" element={<Order />} />
                <Route path="/Category" element={<Category />} />
            </Routes>
        </div>
    );
}

export default App;
