import axios from 'axios';
import axiosInstance from '../helpers/axios';
import { authConstant, userConstant } from './constant';
import { toastError, toastWaning } from '../component/UI/toast/toast';
import { toast } from 'react-toastify';
export const register = (user) => {
    console.log(user);
    return async (dispatch) => {
        dispatch({
            type: userConstant.SIGNUP__REQUEST,
            payLoad: user,
        });
        const res = await axiosInstance.post('/api/admin/signUp', {
            ...user,
        });
        console.log(res);
        if (res.status === 200) {
            const { message } = res.data;
            dispatch({
                type: userConstant.SIGNUP__SUCCESS,
                payLoad: {
                    message,
                },
            });
        } else {
            if (res.status === 201) {
                toastWaning(res.data.message);
                dispatch({
                    type: userConstant.SIGNUP__FAILUE,
                    payLoad: { error: res.data.error },
                });
            }
            if (res.status === 202) {
                toastError(res.data.errors);
                dispatch({
                    type: userConstant.SIGNUP__FAILUE,
                    payLoad: { error: res.data.errors },
                });
            }
        }
    };
};
