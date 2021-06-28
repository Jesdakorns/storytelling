import React, { useEffect, useState } from 'react'
import Link from '../components/Link';
import AppBar from '../components/AppBar';
import BoxLogo from '../components/BoxLogo';
import Footer from '../components/Footer';
import Carousel from 'react-grid-carousel'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect, useDispatch, useSelector } from 'react-redux';
import { loadCategory, loadStory } from './../store/actions/productsAction';
import { Checkbox, Chip, Container, FormControlLabel, Grid } from '@material-ui/core';
import router, { useRouter } from 'next/router';


import getConfig from 'next/config'
import { Skeleton } from '@material-ui/lab';
const env = getConfig().publicRuntimeConfig;


import * as cookie from 'cookie'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .box-content': {
                marginTop: '35px',
                marginBottom: '35px',

            },
            '& .box-title': {
                marginBottom: '50px'
            },
            '& .box-category': {
                display: 'flex',
                flexDirection: 'column',
                ['@media (max-width: 959px) ']: {
                    maxHeight: '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.15s ease-out',
                },
                '&.open': {
                    maxHeight: '1000px',
                    transition: 'max-height 0.25s ease-in',
                }
            },

            '& .box-image-story': {
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
            },

            '& .text-title-story': {
                fontWeight: 'revert',
            },
            '& .box-pagination': {
                marginTop: '50px',
                display: 'flex',
                justifyContent: 'flex-end',
                ['@media (max-width: 599px) ']: {
                    justifyContent: 'center',
                },
            },
            '& .box-filter': {
                display: 'flex',
                flexDirection: 'column',
            },
            '& .btn-filter-products-mobile ': {

                marginBottom: '30px',
                display: 'none',
                alignItems: 'center',
                float: 'left',
                textAlign: 'left',
                borderRadius: '.1875rem',
                color: '#222!important',
                backgroundColor: 'transparent!important',
                border: '1px solid#ededed!important',
                ['@media (max-width: 959px) ']: {
                    display: 'flex',
                    width: '300px',
                },
                ['@media (max-width: 600px) ']: {
                    display: 'flex',
                    width: '100%',
                },

            }

        }
    })
);
const storys = ({ dataServer }) => {
    const classes = useStyles();
    const router = useRouter();
    const counter = useSelector((state) => state['reducer'])
    const dispatch = useDispatch()

    const { category, page } = router.query;
    const [filter, setFilter] = useState(false);
    const [v_page, setPage] = useState(1);
    const [v_category, setCategory] = useState('default');
    // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    // const handleDateChange = (date) => {
    //     setSelectedDate(date);
    // };

    const handleCheckCategory = (event) => {
        setCategory(event.target.value)
    }
    const handleChangePage = (event, value) => {
        setPage(value);
    };


    useEffect(() => {
        dispatch(loadStory(v_page, v_category));
        dispatch(loadCategory());
    }, []);

    useEffect(() => {
        router.push({
            pathname: `/storys`, query: { page: v_page, category: v_category }
        })
        dispatch(loadStory(v_page, v_category));
    }, [v_page, v_category])


    const clickFilter = () => {


        setFilter(!filter);
    }
    return (
        <div className={classes.root}>
            <AppBar keyCookie={dataServer}></AppBar>
            <BoxLogo></BoxLogo>
            <div className="box-content">
                <Container fixed>
                    <Grid container spacing={3} >

                        <Grid item xs={12} md={3} >
                            <div className="box-title">
                                <h3>Story</h3>
                            </div>
                            <div className="box-filter">
                                <button className="btn btn-filter-products-mobile" type="button" data-toggle="collapse" data-target="#collapseFilters" aria-expanded="true" aria-controls="collapseFilters" onClick={clickFilter}>
                                    <i className="fal fa-filter" style={{ width: '15px' }}></i>
                                    &nbsp;Filter Category
                                </button>

                                <div className={`box-category ${filter && 'open'}`}>
                                    <h5>category</h5>
                                    <div className="group">
                                        {
                                            counter.categorys.map((fruite, index) => {
                                                return (
                                                    <div key={fruite.id}>
                                                        <input type="radio" name="rb" id={`${fruite.value}`} onChange={handleCheckCategory} value={fruite.isChecked} checked={v_category === fruite.isChecked} />
                                                        <label htmlFor={`${fruite.value}`}>{fruite.value}</label>
                                                    </div>

                                                    // <div className="box-checked" key={fruite.id}>
                                                    //     <FormControlLabel
                                                    //         className="form-control-checked mb-0 ml-3"

                                                    //         control={<>
                                                    //             <Checkbox color="primary" onChange={handleCheckChieldElement} value={fruite.value} />
                                                    //         </>}
                                                    //         label={fruite.value}
                                                    //     />

                                                    // </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* <div className="box-yeart">
                            <h5>Yeart</h5>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container spacing={3} alignItems="center" justify="center" >
                                    <Grid item xs={12} lg={5} >
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"

                                            format="MM/dd/yyyy"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={1}  >
                                        <div>To</div>
                                    </Grid>
                                    <Grid item xs={12} lg={5} >
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"

                                            format="MM/dd/yyyy"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </div> */}
                        </Grid>
                        <Grid item xs={12} md={9} >
                            <Container fixed>
                                <Grid container spacing={3} >
                                    {counter.story.item.map((value, index) =>

                                        <Grid item xs={12} sm={6} md={4} lg={3} key={value.id}>
                                            <Link to={`/story/${value.id}`} style="">  <div className="box-image-story" style={{ backgroundImage: `url('${env.API_BASE}${value.sr_coverImage}')` }}>  <Chip className="chip" label={value.sr_description} /></div>
                                                <div className="text-name-story text-center">{value.title}</div>
                                            </Link>
                                        </Grid>


                                    )}
                                </Grid>


                            </Container>
                            <div className="box-pagination">
                                <Pagination count={counter.story.last_page} defaultPage={1} page={v_page} onChange={handleChangePage} />

                            </div>
                        </Grid>

                    </Grid>
                </Container>
            </div>
            <Footer></Footer>
        </div>
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

export default storys;