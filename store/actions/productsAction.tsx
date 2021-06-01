export const loadRating = () => async (dispatch, subscribe) => {
    const items = [
        {
            id: 1,
            name: 'Jesdakorn Saelor',
            image: 'https://picsum.photos/800/600?random=1',
        },
        {
            id: 2,
            name: 'Jesdakorn Saelor',
            image: 'https://picsum.photos/800/600?random=2',
        },
        {
            id: 3,
            name: 'Jesdakorn Saelor',
            image: 'https://picsum.photos/800/600?random=3',
        }, {
            id: 4,
            name: 'Jesdakorn Saelor',
            image: 'https://picsum.photos/800/600?random=4',
        },
        {
            id: 5,
            name: 'Jesdakorn Saelor',
            image: 'https://picsum.photos/800/600?random=5',
        },
        {
            id: 6,
            name: 'Jesdakorn Saelor',
            image: 'https://picsum.photos/800/600?random=6',
        },
        {
            id: 7,
            name: 'Jesdakorn Saelor',
            image: 'https://picsum.photos/800/600?random=7',
        },
        {
            id: 8,
            name: 'Jesdakorn Saelor',
            image: 'https://picsum.photos/800/600?random=8',
        },
        {
            id: 9,
            name: 'Jesdakorn Saelor',
            image: 'https://picsum.photos/800/600?random=9',
        },
        {
            id: 10,
            name: 'Jesdakorn Saelor',
            image: 'https://picsum.photos/800/600?random=10',
        },
        {
            id: 11,
            name: 'Jesdakorn Saelor',
            image: 'https://picsum.photos/800/600?random=11',
        },
        {
            id: 12,
            name: 'Jesdakorn Saelor',
            image: 'https://picsum.photos/800/600?random=12',
        },
        {
            id: 13,
            name: 'Jesdakorn Saelor',
            image: 'https://picsum.photos/800/600?random=13',
        },
        {
            id: 14,
            name: 'Jesdakorn Saelor',
            image: 'https://picsum.photos/800/600?random=14',
        }
    ];
    dispatch({ type: 'RATING', payload: items })
    return subscribe({ type: 'RATING', payload: items })
}

export const loadStoryRecommend = () => async (dispatch, subscribe) => {
    const items = [
        {
            id: 1,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=1',
        },
        {
            id: 2,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=2',
        },
        {
            id: 3,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=3',
        },
        {
            id: 4,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=4',
        },
        {
            id: 5,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=5',
        },
        {
            id: 6,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=6',
        },
        {
            id: 7,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=7',
        },
        {
            id: 8,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=8',
        }
    ];
    dispatch({ type: 'STORY_RECOMMEND', payload: items })
    return subscribe({ type: 'STORY_RECOMMEND', payload: items })
}

export const loadStory = (page) => async (dispatch, subscribe) => {
    console.log('page: ', page);

    const items = {
        data:{
            totle: 10,
            
        },
        item: [{
            id: 1,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=1',
        },
        {
            id: 2,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=2',
        },
        {
            id: 3,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=3',
        },
        {
            id: 4,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=4',
        },
        {
            id: 5,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=5',
        },
        {
            id: 6,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=6',
        },
        {
            id: 7,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=7',
        },
        {
            id: 8,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=8',
        },
        {
            id: 9,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=9',
        },
        {
            id: 10,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=10',
        },
        {
            id: 11,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=11',
        },
        {
            id: 12,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=12',
        },
        {
            id: 13,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=13',
        },
        {
            id: 14,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=14',
        },
        {
            id: 15,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=15',
        },
        {
            id: 16,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=16',
        },
        {
            id: 17,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=17',
        },
        {
            id: 18,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=18',
        },
        {
            id: 19,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=19',
        },
        {
            id: 20,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=20',
        },
        {
            id: 21,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=21',
        },
        {
            id: 22,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=22',
        },
        {
            id: 23,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=23',
        },
        {
            id: 24,
            title: 'Black Genuine Leather Bags.',
            image: 'https://picsum.photos/800/600?random=24',
        }]
    };
    dispatch({ type: 'STORYS', payload: items })
    return subscribe({ type: 'STORYS', payload: items })
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

