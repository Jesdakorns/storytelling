import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Navbar from '../components/Navbar';
import ImageContent from '../components/ImageContent';
import { Container, Grid, Paper } from '@material-ui/core';
import color from '../src/color';
import BoxBlog from '../components/BoxBlog';

const useStyles = makeStyles({
    bg: {
        backgroundColor: color.white
    },
    content: {
     minHeight: '50vh',
     paddingTop: '40px',
     paddingBottom: '40px',
        '& .box-blog': {
            display: 'flex',
            flexWrap: 'wrap',
        }
    }
});
export default function honours_awards() {
    const classes = useStyles();
    const [blog, setBlog] = useState([
        {
            id: 1,
            title: '',
            content: '',
            image: '/image/honours_awards_1.jpg'
        },
        {
            id: 2,
            title: '',
            content: '',
            image: '/image/honours_awards_2.jpg'
        },
        {
            id: 3,
            title: '',
            content: '',
            image: '/image/honours_awards_3.png'
        },
        {
            id: 4,
            title: '',
            content: '',
            image: '/image/honours_awards_4.jpg'
        },

    ])
    return (
        <>
            <Navbar></Navbar>
            <ImageContent title="PORTFOLIO"></ImageContent>
            <div className={classes.bg}>
                <Container fixed className={classes.content}>

                    <div className="box-blog">
                        <Grid container spacing={3}>
                            {blog.map((value, index) => {
                                return (
                                    <Grid item sm={12} md={6} lg={6} xs={12} key={value.id}>
                                        <BoxBlog data={value}></BoxBlog>
                                    </Grid>

                                )
                            })}

                        </Grid>


                    </div>

                </Container>
            </div>
        </>
    )
}
