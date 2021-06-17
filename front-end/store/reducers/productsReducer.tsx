
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
    story: {
        data: {
            totle: 0
        },
        item: []
    },

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
        case "CATEGORYS":
            return {
                ...state,
                categorys: action.payload,
            };
        default:
            return { ...state };
    }
};
export default productsReducer