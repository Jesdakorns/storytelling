import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Button } from "@material-ui/core";

import { TweenMax, TimelineLite, Power3, gsap, CSSPlugin } from 'gsap';
import Navbar from "../components/Navbar";
import ImageContent from "../components/ImageContent";
// import { CSSPlugin } from 'gsap/CSSPlugin'
import color from '../src/color';
import { useRouter } from "next/router";

const useStyles = makeStyles({
    root: {
        position: 'relative',
        width: '100%',
 
 
        background: '#111',
        // position: 'relative',
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // color: color.white,
        flexDirection: 'column',
        overflow: 'hidden',
        // padding: '25px',
        '& .row': {
            position: 'relative',
            top: '-50%',
            width: '100%',
            display: 'flex',
            padding: '10px 0',
            whiteSpace: 'nowrap',
            fontSize: '64px',
            transform: 'rotate(-30deg)',
            '& div': {

                animation: 'animate1 80s linear infinite',
                animationDelay: '-80s',
                '&:nth-child(2)': {
                    animation: 'animate2 80s linear infinite',
                    animationDelay: '-40s',
                }
            }
        },
        '& .row:nth-child(even)': {
            position: 'relative',
            top: '-50%',
            width: '100%',
            display: 'flex',
            padding: '10px 0',
            whiteSpace: 'nowrap',
            fontSize: '64px',
            transform: 'rotate(-30deg)',
            '& div': {

                animation: 'animate3 80s linear infinite',
                animationDelay: '-80s',
                '&:nth-child(2)': {
                    animation: 'animate4 80s linear infinite',
                    animationDelay: '-40s',
                }
            }
        },
        '& .icon-bg': {
            color: 'rgba(0, 0, 0 , 0.5)',
            transition: '0.5s',
            padding: '0 5px',
            useSelect: 'none',
            cursor: 'default',
            '&:hover': {
                transition: '0s',
                color: '#fff',
                textShadow: '0 0 120px #fff'
            }
        },
        '& .title': {
            // position: 'absolute',
            color: color.white,
            fontSize: '65px',
            textAlign: 'center',
            ['@media (max-width: 900px)  and (orientation: landscape)']: {
                fontSize: '35px',
            },
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
            color: color.white
        },
        '& .box-title':{
            position: 'absolute',
            top: '0',
            width:' 100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
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
            y: '0'

        }).to(box.current, {
            // duration: 1,
            // scaleX: 0,
            y: '-100%'
            // rotation: 360,

        })
        gsap.registerPlugin(CSSPlugin)
        await router.push(`/about`)
    }
    return (
        <React.Fragment>
            <div className={classes.root + ' _main'} ref={box}>
                {
                    [1, 2, , 2, 2, 2, 222, 22, 22, 2, 2, 2, 2, 2, 2, 2].map((value, index) => {
                        return (
                            <div className="row" key={index}>
                                <div>
                                    <i className="icon-bg"><i className="fab fa-html5" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-css3-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-js" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-node" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-vuejs" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-react" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-bootstrap" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-code" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-github-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-shield-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-user-secret" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-amazon" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-bootstrap" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-code" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-github-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-shield-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-user-secret" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-amazon" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-html5" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-css3-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-js" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-node" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-vuejs" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-react" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-bootstrap" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-code" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-github-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-shield-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-user-secret" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-amazon" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-bootstrap" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-code" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-github-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-shield-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-user-secret" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-amazon" aria-hidden="true"></i></i>
                                </div>
                                <div>
                                    <i className="icon-bg"><i className="fab fa-html5" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-css3-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-js" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-node" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-vuejs" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-react" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-bootstrap" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-code" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-github-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-shield-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-user-secret" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-amazon" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-bootstrap" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-code" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-github-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-shield-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-user-secret" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-amazon" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-html5" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-css3-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-js" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-node" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-vuejs" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-react" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-bootstrap" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-code" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-github-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-shield-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-user-secret" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-amazon" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-bootstrap" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-code" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-github-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-shield-alt" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fas fa-user-secret" aria-hidden="true"></i></i>
                                    <i className="icon-bg"><i className="fab fa-amazon" aria-hidden="true"></i></i>
                                </div>
                            </div>
                        )

                    })


                }


                <div className="box-title">
                    <h1 className="title">Welcome to profile<br /> Jesdakorn</h1>
                    <div className="btn-next" onClick={goMain}><i className="icon-next"><i className="fal fa-angle-down"></i></i></div>

                </div>
            </div>
            {/* <Navbar></Navbar> */}
            {/* <ImageContent title="HOME"></ImageContent> */}

        </React.Fragment>
    );
}
