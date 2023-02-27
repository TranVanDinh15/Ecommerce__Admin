import { toastSucess } from '../component/UI/toast/toast';
import axiosInstance from '../helpers/axios';
import { productConstant } from './constant';

export const actionCreateProduct = (data, token) => {
    return async (dispatch) => {
        dispatch({
            type: productConstant.CREATE_PRODUCT_REQUEST,
            payLoad: {
                loading: true,
            },
        });
        const res = await axiosInstance(token).post('/api/product/create', data);
        console.log(res);
        if (res.status == 200) {
            toastSucess('Tạo thành công');
            dispatch({
                type: productConstant.CREATE_PRODUCT_SUCCESS,
                payLoad: {
                    loading: false,
                    product: res.data.product,
                },
            });
        }
    };
};
export const actionGetProduct = () => {
    return async (dispatch) => {
        dispatch({
            type: productConstant.GET_PRODUCT_REQUEST,
            payLoad: {
                loading: true,
            },
        });
        const res = await axiosInstance().get('/api/product/getProduct');
        console.log(res);
        if (res.status == 200) {
            dispatch({
                type: productConstant.GET_PRODUCT_SUCCESS,
                payLoad: {
                    loading: false,
                    error: false,
                    product: res.data,
                },
            });
        } else {
            dispatch({
                type: productConstant.GET_PRODUCT_FAIL,
                payLoad: {
                    error: true,
                },
            });
        }
    };
};
