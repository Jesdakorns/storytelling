import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Button } from "@material-ui/core";

import { TweenMax, TimelineLite, Power3 } from 'gsap';
import Navbar from "../components/Navbar";
import ImageContent from "../components/ImageContent";

import color from '../src/color';
import { useRouter } from "next/router";
const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100vh',
        background: color.main,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: color.white,
        flexDirection: 'column',
        padding: '25px',
        '& .title': {
            // position: 'absolute',
            color: color.white,
            fontSize: '65px',
            textAlign: 'center',
            ['@media (max-width: 700px)  and (orientation: portrait)']: {
                fontSize: '45px',
            }
        },
        '& .btn-next': {
            cursor: 'pointer',
            border: '1px solid #fff',
            width: '60px',
            height: '60px',
            borderRadius: '999px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

        },
        '& .icon-next': {
            fontSize: '35px',
            lineHeight: 0,
        }
    },


});

export default function Home() {
    const classes = useStyles();
    const router = useRouter();
    let box = useRef(null);
    let tl1 = new TimelineLite();
 
    const goMain = async () => {

        await tl1.from(box.current, {
            // duration: 1,
            // scaleX: 1,
            // ease: "bounce",
            // rotation: 0,
            // transformPerspective: 500,

        }).to(box.current, {
            // duration: 1,
            // scaleX: 0,
            y:'-100%'
            // rotation: 360,

        })

        // await router.push(`/about`)
    }
    return (
        <React.Fragment>
            <div className={classes.root} ref={box}>
                <h1 className="title">Welcome to profile<br /> Jesdakorn</h1>
                <div className="btn-next" onClick={goMain}><i className="icon-next"><i className="fal fa-angle-down"></i></i></div>
            </div>
            {/* <Navbar></Navbar> */}
            {/* <ImageContent title="HOME"></ImageContent> */}

        </React.Fragment>
    );
}
