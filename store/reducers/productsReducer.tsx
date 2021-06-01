
const initialState = {
    product: {
        title: '',
        price: 0,
        images: [],
        total: 0,
        category: '',
        brand: '',
        color: '',
        externalMaterial: '',
        sentFrom: '',
        detail: <></>,
        rating: {
            total: 0,
            list: []
        }
    },
    products: [],
    categorys: [],
    trendys: [],
    rating: [],
    storyRecommend: [],
    story: [],
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "RATING":
            return {
                ...state,
                rating: action.payload,
            };
        case "STORY_RECOMMEND":
            return {
                ...state,
                storyRecommend: action.payload,
            };
        case "STORYS":
            return {
                ...state,
                story: action.payload,
            };
        case "PRODUCTS":
            return {
                ...state,
                products: action.payload,
            };
        case "CATEGORY_PRODUCTS":
            return {
                ...state,
                categorys: action.payload,
            };
        case "TRENDYS_PRODUCTS":
            return {
                ...state,
                trendys: action.payload,
            };
        default:
            return { ...state };
    }
};
export default productsReducer