import { authConstant } from '../actions/constant';

// import
const initialState = {
    token: null,
    user: null,
    authenticate: false,
    authenticating: false,
};
export const loginReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case authConstant.LOGIN__REQUEST: {
            console.log(actions.payLoad);
            state = {
                ...actions.payLoad,
                authenticating: true,
            };
            break;
        }
        case authConstant.LOGIN__SUCCESS:
            state = {
                ...state,
                user: actions.payLoad.user,
                token: actions.payLoad.token,
                authenticate: true,
                authenticating: false,
            };
            console.log(state);
            break;
        case authConstant.LOGOUT__SUCCESS:
            console.log(state);
            state = {
                token: null,
            };
            break;
    }
    return state;
};
