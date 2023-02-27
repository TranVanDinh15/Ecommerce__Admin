import axiosInstance from '../helpers/axios';
import { categoryConstant } from './constant';
import { toastError, toastSucess } from '../component/UI/toast/toast';
export const categoryAction = (category) => {
    return async (dispatch) => {
        dispatch({
            type: categoryConstant.GETCATEGORY__REQUEST,
            payLoad: {
                loading: true,
            },
        });
        const res = await axiosInstance().get('/api/category/getCategory');
        if (res.status == 200) {
            dispatch({
                type: categoryConstant.GETCATEGORY__SUCCESS,
                payLoad: {
                    category: res.data.categoriesList,
                    loading: false,
                },
            });
        } else {
            dispatch({
                type: categoryConstant.GETCATEGORY__FAILUE,
                payLoad: {
                    error: true,
                },
            });
        }
    };
};

export const addCategory = (form, token) => {
    return async (dispatch) => {
        dispatch({
            type: categoryConstant.ADDCATEGORY__REQUEST,
            payLoad: {
                loading: true,
            },
        });
        const res = await axiosInstance(token).post('/api/category/create', form);
        console.log(res);
        if (res.status == 201) {
            console.log(res);
            toastSucess('Tạo thành công');
            // const updateCategory=builderNewCategory(res.data.categogy._id, )
            const categogy = await res.data.category;
            console.log(categogy);
            dispatch({
                type: categoryConstant.ADDCATEGORY__SUCCESS,
                payLoad: {
                    categogy: categogy,
                },
            });
        } else {
            if (res.status == 202) {
                toastError('Tạo thất bại');
            }
        }
    };
};
