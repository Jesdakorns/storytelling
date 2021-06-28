import React, { useEffect, useState } from 'react'
import Link from '../../components/Link';
import AppBar from '../../components/AppBar';
import BoxLogo from '../../components/BoxLogo';
import Footer from '../../components/Footer';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { loadGetStory } from '@/store/actions/productsAction';

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import * as cookie from 'cookie'
import { Container, Grid } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .box-content':{
                minHeight: '300px'
            }
        }
    })
);
export default function story({ dataServer }) {
    const classes = useStyles();
    const router = useRouter();
    const { id } = useRouter().query;
    const counter = useSelector((state) => state['reducer'])
    const dispatch = useDispatch()

    const [story, setStory] = useState({
        abstract: '',
        created_at: '',
        description: '',
        id: 0,
        images: [],
        like: 0,
        story: '',
        title: '',
        updated_at: '',
    })
    const [profile, setProfile] = useState({ id: '', image: '', name: '' })

    useEffect(() => {

        console.log('story -> ', counter);
        (async () => {
            let resGetStory = await dispatch(loadGetStory(id));
            await console.log('resGetUser -> ', resGetStory['reducer']);
            if (resGetStory['reducer'].content?.profile && resGetStory['reducer'].content?.story) {
                console.log('sdg');

                await setStory(resGetStory['reducer'].content.story)
                await setProfile(resGetStory['reducer'].content.profile)
            }


        })();
    }, [])
    useEffect(() => {
        console.log('story -> ', story);

    }, [story, profile])
    return (
        <div className={classes.root}>
            <AppBar keyCookie={dataServer}></AppBar>
            <BoxLogo></BoxLogo>
            <div className="box-content my-3">
                <Container fixed>
                    <Grid container spacing={3} justify="center">

                        <Grid item xs={12} >
                            {ReactHtmlParser(story.story)}


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

