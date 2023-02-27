import { combineReducers } from 'redux';
import { loginReducer } from './auth.reducer';
import { signUpReducer } from './user.reducer';
import { category } from './category.reducer';
import { productReducer } from './product.reducer';
const rootReducer = combineReducers({
    auth: loginReducer,
    user: signUpReducer,
    category: category,
    product: productReducer,
});
export default rootReducer;
