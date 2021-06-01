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
export default function portfolio() {
    const classes = useStyles();
    const [blog, setBlog] = useState([
        {
            id: 1,
            title: 'ระบบจัดการชุดข้อมูลเกม',
            content: '',
            image: '/image/Untitled-0.png'
        },
        {
            id: 2,
            title: 'เกมจับคู่ภาพ',
            content: '',
            image: '/image/Untitled-1.png'
        },
        {
            id: 3,
            title: 'เกมตอบคำถาม',
            content: '',
            image: '/image/Untitled-2.png'
        },
        {
            id: 4,
            title: 'เกมเรียงภาพ',
            content: '',
            image: '/image/Untitled-3.png'
        },
        {
            id: 5,
            title: 'เกมจับวัตถุ',
            content: '',
            image: '/image/Untitled-4.png'
        },
        {
            id: 6,
            title: 'เกมวัตถุตะลุยอวกาศ',
            content: '',
            image: '/image/Untitled-5.png'
        },
        {
            id: 7,
            title: 'ระบบ Storytelling mini',
            content: '',
            image: '/image/Untitled-6.png'
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
                                    <Grid item sm={12} md={6} lg={4} xs={12} key={value.id}>
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
