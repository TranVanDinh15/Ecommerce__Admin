import { userConstant } from '../actions/constant';

// import
const initialState = {
    error: null,
    message: '',
    loading: false,
};
export const signUpReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case userConstant.SIGNUP__REQUEST:
            state = {
                loading: true,
            };
            break;
        case userConstant.SIGNUP__SUCCESS:
            state = {
                loading: false,
                message: actions.payLoad.message,
            };
            break;
        case userConstant.SIGNUP__FAILUE:
            state = {
                error: true,
            };
            break;
    }
    return state;
};
