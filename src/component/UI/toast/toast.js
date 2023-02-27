import { toast } from 'react-toastify';
export const toastError = (content) => {
    return toast.error(content, {
        position: toast.POSITION.TOP_RIGHT,
        theme: 'colored',
    });
};
export const toastSucess = (content) => {
    return toast.success(content, {
        position: toast.POSITION.TOP_RIGHT,
        theme: 'colored',
    });
};
export const toastWaning = (content) => {
    return toast.warning(content, {
        position: toast.POSITION.TOP_RIGHT,
        theme: 'colored',
    });
};
