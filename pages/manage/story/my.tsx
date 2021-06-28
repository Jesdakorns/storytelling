import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as cookie from 'cookie'
import getConfig from 'next/config'
const env = getConfig().publicRuntimeConfig;

// components
import Layout from '@/components/manage/Layout';

// store
import { loadStoryMy } from '@/store/actions/productsAction';

// material-ui
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { AppBar, Button, Chip, Container, Dialog, Grid, IconButton, List, Toolbar, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .box-image-story': {
                backgroundSize: 'auto 100%',
                position: 'relative',
                margin: '5px 0',
                width: '100%',
                height: '150px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                borderRadius: '20px',
                '& .chip': {
                    position: 'absolute',
                    right: '15px',
                    top: '15px'
                }
            },
            '& .box-pagination': {
                marginTop: '50px',
                display: 'flex',
                justifyContent: 'flex-end',
                ['@media (max-width: 599px) ']: {
                    justifyContent: 'center',
                },
            },
            '& .text-title-story': {
                overflow: 'hidden',
                height: 'auto'
            },
        },
        appBar: {
            position: 'relative',
            background: '#ffffff',
            color: '#000'
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    })
);



const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => <Slide direction="up" />);


const my = ({ dataServer }) => {
    const classes = useStyles();
    const router = useRouter()
    const counter = useSelector((state) => state['reducer'])
    const dispatch = useDispatch()

    const [v_page, setPage] = useState(1);

    useEffect(() => {
        dispatch(loadStoryMy(v_page))
    }, [])

    useEffect(() => {
        console.log("counter", counter);

        router.push({
            pathname: `/manage/story/my`, query: { page: v_page }
        })
        dispatch(loadStoryMy(v_page));
    }, [v_page])

    const handleChangePage = (event, value) => {
        setPage(value);
    };



    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const dialog = (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Sound
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            dfhdsfh
        </Dialog>
    )




    return (
        <div className={classes.root}>
            <Layout keyCookie={dataServer}>


                {/* <Container fixed> */}
                <Grid container spacing={3} >
                    {counter.my_story.item.map((value, index) =>

                        <Grid item xs={12} sm={6} md={3} lg={2} key={value.id} onClick={handleClickOpen}>
                            <div className="box-image-story" style={{ backgroundImage: `url('${env.API_BASE}${value.sr_coverImage}')` }}>
                                <Chip className="chip" label={value.sr_description} />
                            </div>
                            <div className="text-title-story text-center"><p className="line-clamp">{value.sr_title}</p></div>
                        </Grid>


                    )}
                </Grid>


                {/* </Container> */}
                <div className="box-pagination">
                    <Pagination count={counter.my_story.last_page} defaultPage={1} page={v_page} onChange={handleChangePage} />

                </div>
                {dialog}
            </Layout>
        </div >
    )
}

export async function getServerSideProps(context) {
    let dataServer = null
    if (context.req.headers.cookie) {
        dataServer = cookie.parse(context.req.headers.cookie);
    }

    return {
        props: { dataServer }
    }
}

export default my
