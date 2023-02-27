import { categoryConstant } from '../actions/constant';

// import
const initialState = {
    loading: null,
    category: [],
    error: '',
};
const builderNewCategory = (parentId, categories, categogy) => {
    const myCategories = [];
    if (parentId == undefined) {
        return [
            ...categories,
            {
                _id: categogy._id,
                name: categogy.name,
                slug: categogy.slug,
                parentId: categogy.parentId,
                children: categogy.children,
            },
        ];
    }
    for (let cat of categories) {
        if (cat._id == parentId) {
            myCategories.push({
                ...cat,
                children: cat.children
                    ? builderNewCategory(
                          parentId,
                          [
                              ...cat.children,
                              {
                                  _id: categogy._id,
                                  name: categogy.name,
                                  slug: categogy.slug,
                                  parentId: categogy.parentId,
                                  children: categogy.children,
                              },
                          ],
                          categogy,
                      )
                    : [],
            });
        } else {
            myCategories.push({
                ...cat,
                children: cat.children > 0 ? builderNewCategory(parentId, cat.children, categogy) : [],
            });
        }
    }
    return myCategories;
};
export const category = (state = initialState, actions) => {
    switch (actions.type) {
        case categoryConstant.GETCATEGORY__REQUEST:
            return (state = {
                ...actions.payLoad,
            });
        case categoryConstant.GETCATEGORY__SUCCESS:
            return (state = {
                ...actions.payLoad,
            });
        case categoryConstant.GETCATEGORY__FAILUE:
            return (state = {
                ...actions.payLoad,
            });
        case categoryConstant.ADDCATEGORY__REQUEST:
            return (state = {
                ...state,
                loading: true,
            });
        case categoryConstant.ADDCATEGORY__SUCCESS:
            console.log(state.category);
            const updateCategory = builderNewCategory(
                actions.payLoad.categogy.parentId,
                state.category,
                actions.payLoad.categogy,
            );
            return (state = {
                ...state,
                category: updateCategory,
                loading: false,
            });
        case categoryConstant.ADDCATEGORY__FAILUE:
            return (state = {
                ...state,
                // loading: false,
            });
    }
    return state;
};
