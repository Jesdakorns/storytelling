const axios = require('axios');
import getConfig from 'next/config'
const env = getConfig().publicRuntimeConfig;
import Cookies from 'js-cookie'


export const registerStorytelling = (req) => async (dispatch, subscribe) => {
    console.log('email', req.email);
    // console.log('password', password);
    // console.log('env', env);

    // let items = 'false';
    await axios.post(`${env.API_HOST}auth/signup`, {
        email: req.email,
        password: req.password,
        name: req.name,
        sex: req.gender,
    }).then(function (response) {

        console.log('signup -> ', response);
    }).catch(function (error) {

        console.log(error);
    });


    dispatch({ type: 'REGISTER' })
    return subscribe({ type: 'REGISTER' })
}

export const loginStorytelling = (email, password) => async (dispatch, subscribe) => {
    console.log('email', email);
    console.log('password', password);
    console.log('env', env);

    let items = 'false';
    await axios.post(`${env.API_HOST}auth/signin`, {
        email: email,
        password: password
    }).then(function (response) {

        if (response.data.user.token != null) {
            localStorage.setItem('ls-u', response.data.user.token);
            // window.location.replace("/");
        } else {

        }

        console.log(response);
    }).catch(function (error) {

        console.log(error);
    });


    dispatch({ type: 'LOGIN', payload: items })
    return subscribe({ type: 'LOGIN', payload: items })
}

export const logoutStorytelling = () => async (dispatch, subscribe) => {

    // console.log('email', email);
    // console.log('password', password);
    // console.log('env', env);
    let items = {};
    await axios.delete(`${env.API_HOST}auth/signout`, {
        headers: {
            'Authorization': `bearer ${Cookies.get('k_user')}`
        }
    }).then(function (response) {
        Cookies.remove('k_user')

        console.log("logout ", response);
        items = {
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
        }
    }).catch(function (error) {

        console.log(error);
    });


    dispatch({ type: 'LOGOUT', payload: items })
    return subscribe({ type: 'LOGOUT', payload: items })
}

export const getUser = () => async (dispatch, subscribe) => {
    console.log('getUser');

    let items = {}
    await axios.get(`${env.API_HOST}auth/profile`, {
        headers: {
            'Authorization': `bearer ${Cookies.get('k_user')}`
        }
    }).then((res) => {
        // console.log(res.data)
        if (res.data.status.success) {
            items = { isAuth: true, user: res.data.user }
        } else {
            items = { isAuth: false, user: null }
        }

    }).catch((error) => {
        console.log('error')
        // items = { isAuth: false }
    })
    // console.log("items", items);

    dispatch({ type: 'GET_USER', payload: items })
    return subscribe({ type: 'GET_USER', payload: items })
}


export const loadRating = () => async (dispatch, subscribe) => {
    let items;
    await axios.get(`${env.API_HOST}auth/storys`).then((res) => {
        console.log(res.data)
        items = res.data.avatarRank;
    }).catch((error) => {
        console.log('error')
        // items = { isAuth: false }
    })

    dispatch({ type: 'RATING', payload: items })
    return subscribe({ type: 'RATING', payload: items })
}

export const loadStoryRecommend = () => async (dispatch, subscribe) => {
    let items;
    await axios.get(`${env.API_HOST}auth/storys`).then((res) => {
        console.log(res.data)
        items = res.data.storysRank;
    }).catch((error) => {
        console.log('error')
        // items = { isAuth: false }
    })

    dispatch({ type: 'STORY_RECOMMEND', payload: items })
    return subscribe({ type: 'STORY_RECOMMEND', payload: items })
}

export const loadStory = (page, category = 'default') => async (dispatch, subscribe) => {
    console.log('page: ', page);
    console.log('category: ', category);
    let items;
    // http://127.0.0.1:8000/api/auth/storys/all/list/24/fdgh?page=1
    await axios.get(`${env.API_HOST}auth/storys/all/list/24/${category}?page=${page}`).then((res) => {
        console.log(res.data)
        items = {
            last_page: res.data.SR_Storys.last_page,
            item: res.data.SR_Storys.data

        }
    }).catch((error) => {
        console.log('error')
        // items = { isAuth: false }
    })

    dispatch({ type: 'STORYS', payload: items })
    return subscribe({ type: 'STORYS', payload: items })
}



export const loadStoryMy = (page) => async (dispatch, subscribe) => {
    let items;
    // http://127.0.0.1:8000/api/auth/storys/all/list/24/fdgh?page=1
    await axios.get(`${env.API_HOST}auth/storys/all/my`, {
        headers: {
            'Authorization': `bearer ${Cookies.get('k_user')}`
        }
    }).then((res) => {
        console.log(res.data)
        items = {
            last_page: res.data.storys.last_page,
            item: res.data.storys.data

        }
    }).catch((error) => {
        console.log('error')
        // items = { isAuth: false }
    })
    dispatch({ type: 'MY_STORYS', payload: items })
    return subscribe({ type: 'MY_STORYS', payload: items })
}



export const loadCategory = () => async (dispatch, subscribe) => {
    const items = [
        { id: 1, value: "all", isChecked: 'default' },
        { id: 2, value: "apple", isChecked: 'apple' },
        { id: 3, value: "mango", isChecked: 'mango' },
        { id: 4, value: "grap", isChecked: 'grap' },
        { id: 5, value: "grap1", isChecked: 'grap1' }
    ];
    dispatch({ type: 'CATEGORYS', payload: items })
    return subscribe({ type: 'CATEGORYS', payload: items })
}


export const loadGetStory = (id) => async (dispatch, subscribe) => {
    let items;
    // http://127.0.0.1:8000/api/auth/storys/all/list/24/fdgh?page=1
    await axios.get(`${env.API_HOST}auth/storys/${id}`).then((res) => {
        console.log(res.data)
        if (res.data.status.success) {
            items = {
                profile: res.data.profile,
                story: res.data.storys,
            }
        }else{
            items = {
                profile: {},
                story: {},
            }
        }

    }).catch((error) => {
        console.log('error')
        // items = { isAuth: false }
    })
    dispatch({ type: 'GET_CONTENT', payload: items })
    return subscribe({ type: 'GET_CONTENT', payload: items })
}



export const loadProduct = (id) => async (dispatch, subscribe) => {
    // console.log("start");

    // if (id == 'Black Genuine Leather Bags.') {
    const items = {
        title: 'Black Genuine Leather Bags.',
        price: 23.3,
        images: [
            'http://localhost:3000/assets/img/b1.png',
            'http://localhost:3000/assets/img/b2.png',
            'http://localhost:3000/assets/img/b3.png',
            'http://localhost:3000/assets/img/b4.png',
        ],
        total: 400,
        category: 'รองเท้าแตะแบบสวม',
        brand: 'No Brand(ไม่มียี่ห้อ)',
        color: 'หลากสี',
        externalMaterial: 'ยาง',
        sentFrom: 'อำเภอกำแพงแสน, จังหวัดนครปฐม',
        detail: <><p>Protect your screen from being scratched by sharp object</p><p>Sensitive touch,experience no interference and smooth sliding:</p></>,
        rating: {
            total: 4,
            list: [
                {
                    name: 'Loging Desf',
                    date: '2020-11-27 03:50',
                    content: <><p>สินค่าน่ารัก จัดส่งเร็ว คุ้มค่า</p> <p>สินค่าน่ารัก จัดส่งเร็ว คุ้มค่า</p><p>สินค่าน่ารัก จัดส่งเร็ว คุ้มค่าสิน ค่าน่ารัก จัดส่งเร็ว คุ้มค่า</p></>,
                    rating: 3
                },
                {
                    name: 'Yogio Desf',
                    date: '2020-11-27 03:50',
                    content: <><p>สินค่าน่ารัก จัดส่งเร็ว คุ้มค่า</p> <p>สินค่าน่ารัก จัดส่งเร็ว คุ้มค่า</p><p>สินค่าน่ารัก จัดส่งเร็ว คุ้มค่าสิน ค่าน่ารัก จัดส่งเร็ว คุ้มค่า</p></>,
                    rating: 5
                }
            ]
        }
    }
    dispatch({ type: 'PRODUCT', payload: items })
    return subscribe({ type: 'PRODUCT', payload: items })
    // }


}

