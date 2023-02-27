import axios from 'axios';
import { authConstant } from './constant';
import { toastWaning } from '../component/UI/toast/toast';
import axiosInstance from '../helpers/axios';
export const login = (user, navigate) => {
    console.log(user);
    return async (dispatch) => {
        dispatch({
            type: authConstant.LOGIN__REQUEST,
            payLoad: user,
        });
        const res = await axiosInstance().post('/api/admin/signIn', {
            ...user,
        });
        console.log(res);
        if (res.status === 200) {
            const { token, user } = res.data;
            console.log(res.data);
            dispatch({
                type: authConstant.LOGIN__SUCCESS,
                payLoad: {
                    token,
                    user,
                },
            });
            navigate('/');
        } else {
            if (res.status === 201) {
                toastWaning(res.data.message);
            }
            if (res.status === 400) {
                dispatch({
                    type: authConstant.LOGIN__FAILUE,
                    payLoad: res.data.error,
                });
            }
        }
    };
};
export const logOut = () => {
    return (dispatch) => {
        dispatch({
            type: authConstant.LOGOUT__SUCCESS,
        });
    };
};
