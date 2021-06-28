let local;
if (typeof(Storage) !== "undefined") {
    // Store
    local = localStorage.getItem("ls-u") || ''


}
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
    content:{

    },
    products: [],
    categorys: [],
    trendys: [],
    rating: [],
    storyRecommend: [],
    story: {
        data: {
            last_page: 0
        },
        item: []
    },
    my_story: {
        data: {
            last_page: 0
        },
        item: []
    },
    auth: {
        isAuth: false,
        user: {
            id: '',
            image: '',
            email: '',
            name: '',
            phone: '',
            sex: '',
            address: ''

        }
    },
    localStorage: local




};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_CONTENT":
            return {
                ...state,
                content: action.payload,
            };
        case "GET_USER":
            return {
                ...state,
                auth: action.payload,
            };
        case "LOGIN":
            return {
                ...state,
            };
        case "REGISTER":
            return {
                ...state,
            };
        case "LOGOUT":
            return {
                ...state,
                auth: action.payload,
            };
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
        case "MY_STORYS":
            return {
                ...state,
                my_story: action.payload,
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