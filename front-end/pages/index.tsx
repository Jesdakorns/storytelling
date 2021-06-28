import { Button, Chip, Container, Grid } from '@material-ui/core'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Link from '../components/Link';
import AppBar from '../components/AppBar';
import BoxLogo from '../components/BoxLogo';
import Footer from '../components/Footer';
import Carousel from 'react-grid-carousel'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';

import { connect, useDispatch, useSelector } from 'react-redux';
import { loadRating, loadStoryRecommend } from './../store/actions/productsAction';

import getConfig from 'next/config'
import { Skeleton } from '@material-ui/lab';
const env = getConfig().publicRuntimeConfig;


import * as cookie from 'cookie'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .box-rating': {
                margin: '25px 0',
                '& .box-image': {
                    position: 'relative',

                    width: '100%',
                    height: '250px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    borderRadius: '20px',
                    '& .text-name': {
                        width: '100%',
                        position: 'absolute',
                        bottom: 0,
                        color: '#fff',
                        fontSize: '1.2rem',
                        padding: '5px',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        background: 'linear-gradient(to top, #0000007a, #0000005e, #0000)',
                        borderRadius: ' 0 0 20px 20px',
                        userSelect: 'none',
                       
                    }
                }
            },
            '& .box-recommend': {
                '& .box-image': {
                    position: 'relative',
                    margin: '5px 0',
                    width: '100%',
                    height: '250px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    borderRadius: '20px',
                    '& .chip': {
                        position: 'absolute',
                        right: '15px',
                        top: '15px'
                    }
                }
            },
            '& .text-title': {
                fontWeight: 'revert',
            },
            '& .text-title-story': {
                overflow: 'hidden',
                height: '75px'
            },
           

        }
    })
);

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useEffect(() => {

        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const Index = ({ dataServer }) => {
    const classes = useStyles();
    const counter = useSelector((state) => state['reducer'])
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(dataServer)
        dispatch(loadRating());
        dispatch(loadStoryRecommend());


    }, []);
    useEffect(() => {

        console.log(dataServer);
    },[dataServer])
    const [width, height] = useWindowSize();
    // console.log(width, height);

    return (
        <div className={classes.root}>
            <AppBar keyCookie={dataServer}></AppBar>
            <BoxLogo></BoxLogo>
            <div className="box-rating">
                <h3 className="text-center text-title">Top 14 user</h3>
                <Container fixed>
                    <Carousel cols={width >= 1282 ? 7 : width >= 959 ? 5 : 3} rows={1} gap={10} >
                        {counter.rating.map((value, index) =>
                            <Carousel.Item key={value.id}>
                                <div className="box-image" style={{ backgroundImage: value.image ? `url('${env.API_BASE}${value.image}')` : `url('/assets/images/coverAvatar.png')` }}>
                                    <div className="text-name">{value.name}</div>
                                </div>
                            </Carousel.Item>
                        )}
                    </Carousel>
                </Container>
            </div>
            <div className="box-recommend">
                <h3 className="text-center text-title">Recommend</h3>
                <Container fixed>
                    <Grid container spacing={3} justify="center">

                        {counter.storyRecommend.map((value, index) =>

                            <Grid item xs={12} sm={6} md={3} lg={3} key={value.id}>
                                {/* <Skeleton className="box-image" variant="pulse" />
                                <Skeleton className="text-name text-center" variant="text"/> */}
                                <Link to={`/story/${value.id}`} style="">
                                    <div className="box-image" style={{ backgroundImage: `url('${env.API_BASE}${value.coverImage}')` }}>  <Chip className="chip" label={value.description} /></div>
                                    <div className="text-title-story text-center"><p className="line-clamp">{value.title}</p></div>
                                </Link>
                            </Grid>

                        )}
                    </Grid>
                    <div className="my-5 text-center">
                        <Link to="/storys" style=""><Button variant="contained" color="primary" disableElevation>See more</Button></Link>
                    </div>
                </Container>
            </div>

            <Footer></Footer>
        </div >
    )
}
export async function getServerSideProps(context) {
    console.log(context);
    let dataServer = null
    let c = context.req.headers.cookie
    if (context.req.headers.cookie) {
        dataServer = cookie.parse(context.req.headers.cookie);
    }

    return {
        props: { dataServer }
    }
}

export default Index;