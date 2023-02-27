import { productConstant } from '../actions/constant';

// import
const initialState = {
    loading: null,
    product: '',
    error: '',
};
// const builderNewCategory = (parentId, categories, categogy) => {
//     const myCategories = [];
//     for (let cat of categories) {
//         if (cat._id == parentId) {
//             myCategories.push({
//                 ...cat,
//                 children:
//                     cat.children && cat.children.length > 0
//                         ? builderNewCategory(
//                               parentId,
//                               [
//                                   ...cat.children,
//                                   {
//                                       _id: categogy._id,
//                                       name: categogy.name,
//                                       slug: categogy.slug,
//                                       parentId: categogy.parentId,
//                                       children: categogy.children,
//                                   },
//                               ],
//                               categogy,
//                           )
//                         : [],
//             });
//         } else {
//             myCategories.push({
//                 ...cat,
//                 children:
//                     cat.children && cat.children.length > 0 ? builderNewCategory(parentId, cat.children, categogy) : [],
//             });
//         }
//     }
//     return myCategories;
// };
export const productReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case productConstant.GET_PRODUCT_SUCCESS:
            return (state = {
                ...state,
                product: actions.payLoad.product,
                loading: false,
            });
        case productConstant.CREATE_PRODUCT_REQUEST:
            return (state = {
                ...state,
                loading: true,
            });
        case productConstant.CREATE_PRODUCT_FAIL:
            return (state = {
                ...state,
                error: true,
            });
        case productConstant.GET_PRODUCT_REQUEST:
            return (state = {
                loading: actions.payLoad.loading,
            });
        case productConstant.GET_PRODUCT_SUCCESS:
            return (state = {
                loading: actions.payLoad.loading,
                product: actions.payLoad.product,
                error: actions.payLoad.error,
            });
        case productConstant.GET_PRODUCT_FAIL:
            return (state = {
                error: actions.payLoad.error,
            });
    }
    return state;
};
