import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Navbar from '../components/Navbar';
import ImageContent from '../components/ImageContent';
import { Container, Grid } from '@material-ui/core';
import color from '../src/color';
import Footer from '../components/Footer';

const useStyles = makeStyles({
    content: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 0 ',
        ['@media (max-width: 450px)  and (orientation: portrait)']: {
            padding: '40px 0',
            flexDirection: 'column',
            height: 'auto',
        },
        '& .social': {
            display: 'flex',
            alignItems: 'center',
            margin: '30px 0',
        },
        '& p': {
            margin: 0
        },
        '& .box-icon': {
            border: `2px solid ${color.light}`,
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '25px',
            borderRadius: '999px',
            color: color.light,
            marginRight: '10px'
        },
        '& .text-mail': {
            fontSize: '18px'
        },
        '& .text-content': {
            fontSize: '14px',
            color: color.gray,
            
        },
        '& .left': {
            width: '300px',
            textAlign: 'center',
            marginRight: '50px',
            ['@media (max-width: 450px)  and (orientation: portrait)']: {
                marginRight: '0px',
            },
            '& .title':{
                fontSize: '26px'
            }
        }
    }
});
export default function about() {
    const classes = useStyles();

    return (
        <>
            <Navbar></Navbar>
            <ImageContent title="CONTACT"></ImageContent>
            <Container fixed>
                <section className={classes.content}>
                    <div className="left">
                        <h3 className="title">Contact US</h3>
                        <p>If you have any questions or need more information, you can contact us here.</p>
                    </div>
                    <div>
                        <div className="social">
                            <div className="box-icon"><i className="far fa-envelope"></i></div>
                            <div className="box-text">
                                <p className="text-mail">E-Mail</p>
                                <p className="text-content">Jesdakorns@hotmail.com</p>
                            </div>
                        </div>

                        <div className="social">
                            <div className="box-icon"><i className="fab fa-line"></i></div>
                            <div className="box-text">
                                <p className="text-mail">Line Chat</p>
                                <p className="text-content">Line ID : trunk_sks19</p>
                            </div>
                        </div>

                        <div className="social">
                            <div className="box-icon"><i className="far fa-phone-alt"></i></div>
                            <div className="box-text">
                                <p className="text-mail">PHONE</p>
                                <p className="text-content">088-639-0193</p>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
            <Footer></Footer>
        </>
    )
}
