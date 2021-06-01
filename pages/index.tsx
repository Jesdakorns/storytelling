import { Button, Chip, Container, Grid } from '@material-ui/core'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Link from '../components/Link';
import AppBar from '../components/AppBar';
import BoxLogo from '../components/BoxLogo';
import Footer from '../components/Footer';
import Carousel from 'react-grid-carousel'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { loadRating, loadStoryRecommend } from './../store/actions/productsAction';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .box-rating': {
                margin: '25px 0',
                '& .box-image': {
                    position: 'relative',
                    margin: '5px',
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
                    margin: '5px',
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

        }
    })
);

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const Index = ({ state, loadRating, loadStoryRecommend }) => {
    const classes = useStyles();


    useEffect(() => {
        loadRating();
        loadStoryRecommend();


    }, []);
    useEffect(() => {
        console.log(state);
    })
    const [width, height] = useWindowSize();
    console.log(width, height);

    return (
        <div className={classes.root}>
            <AppBar></AppBar>
            <BoxLogo></BoxLogo>
            <div className="box-rating">
                <h3 className="text-center text-title">Top 14 user</h3>
                <Container fixed>
                    <Carousel cols={width >= 1282 ? 7 : width >= 959 ? 5 : 3} rows={1} gap={10} >
                        {state.rating.map((value, index) =>
                            <Carousel.Item key={value.id}>
                                <div className="box-image" style={{ backgroundImage: `url('${value.image}')` }}>
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
                        {state.storyRecommend.map((value, index) =>
                            <Grid item xs={12} sm={6} md={3} lg={3} key={value.id}>
                                <div className="box-image" style={{ backgroundImage: `url('${value.image}')` }}>  <Chip className="chip" label="Basic" /></div>
                                <div className="text-name text-center">{value.title}</div>

                            </Grid>

                        )}
                    </Grid>
                    <div className="my-5 text-center">
                        <Link to="/storys" style=""><Button variant="contained" color="primary" disableElevation>See more</Button></Link>
                    </div>
                </Container>
            </div>
            <Footer></Footer>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.data,
    }
}

export default connect(mapStateToProps, { loadRating, loadStoryRecommend })(Index);