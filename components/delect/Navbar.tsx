import { Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import color from '../src/color';
import Link from '../components/Link';
import { useRouter } from 'next/router';


const useStyles = makeStyles({
    navbar: {
        width: '100%',
        height: 'auto',
        backgroundColor: color.white,
        border: `0.1px solid #eeeeee`,
        alignItems: 'center',
        '& .navbar-main': {
            display: 'flex',
            alignItems: 'center',
            height: '60px',
            position: 'relative',
        },
        '& .logo-main': {
            fontSize: '24px',
            fontWeight: 'bold',
            ['@media (max-width: 970px)  ']: {
                width: '100%',
                textAlign: 'center',
                position: 'absolute'
            }
        },
        '& .icon-menu': {
            cursor: 'pointer',
            display: 'none',
            fontSize: '24px',
            zIndex: '99',
            ['@media (max-width: 970px)  ']: {
                display: 'flex',
            }
        },
        '& .nav': {
            display: 'flex',
            width: '100%',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',

            ['@media (max-width: 970px)  ']: {
                visibility: 'hidden',
                opacity: 0,
                background: color.white,

                position: "fixed",
                flexDirection: 'column',
                width: '100%',
                height: '100vh',
                // height: 'calc(var(--vh, 1vh) * 100)',
                left: 0,
                top: 0,
                
                '&.active': {
                    visibility: 'visible',
                    zIndex: '999',
                    transition: '0.2s',
                    opacity: 1
                },

            },
            // position: 'absolute',
            '& .icon-close-nav': {
                cursor: 'pointer',
                display: 'none',
                zIndex: '9999',
                justifyContent: 'flex-end',
                fontSize: '2rem',
                padding: '0px 20px',
                position: 'fixed',
                top: '17px',
                right: '7px',
                ['@media (max-width: 970px)  ']: {
                    display: 'flex',

                }
            },
            '& .nav-item': {
                display: 'flex',
                listStyle: 'none',
                padding: 0,
            
                '& .item': {
                    padding: '0 15px',
                    fontSize: '16px',
                    ['@media (max-width: 970px)']: {
                        '& div':{
                            padding: '50px 0px'
                        }
                 
                    }

                },
                '& a': {
                    padding: '10px 0',

                    '&.active': {
                        borderBottom: `2px solid ${color.main}`,
                    }
                },

                ['@media (max-width: 970px)']: {
                    overflow: 'scroll',
                    background: color.white,
                    zIndex: '999',
                    paddingBottom: '80px',
                    // position: "fixed",
                    flexDirection: 'column',
                    width: '100%',
                    // height: '100vh',
                    // height: 'calc(var(--vh, 1vh) * 100)',
                    left: 0,
                    top: 0,
                    // justifyContent: 'space-evenly',
                    alignItems: 'center',


                },
            },

        }
    },


});
export default function Navbar() {
    const classes = useStyles();
    const router = useRouter();

    const [open, setOpen] = useState(false)
    useEffect(() => {
      if(open){
        document.getElementById('__next').classList.add('active')
      }else{
        document.getElementById('__next').classList.remove('active')
      }
    }, [open])
    return (
        <React.Fragment>
            <div className={classes.navbar}>
                <Container fixed>
                    <div className="navbar-main">
                        <div className="icon-menu" onClick={() => setOpen(true)}><i className="far fa-bars"></i></div>
                        <div className="logo-main"><Link to="/" style="">PROFILE</Link></div>
                        <div className={open ? 'nav active' : 'nav'} >
                            <i className="icon-close-nav" onClick={() => setOpen(false)}><i className="fal fa-times"></i></i>
                            <div className="nav-item">
                                
                                <div className="item"><Link to="/" style={(router.pathname == '/' && 'active')} >HOME</Link></div>
                                <div className="item"><Link to="/about" style={(router.pathname == '/about' && 'active')} >ABOUT</Link></div>
                                <div className="item"><Link to="/honours_awards" style={(router.pathname == '/honours_awards' && 'active')} >HONOURS & AWARDS</Link></div>
                                {/* <li className="item"><Link to="/image" style={(router.pathname == '/image' && 'active')} >IMAGE</Link></li> */}
                                <div className="item"><Link to="/portfolio" style={(router.pathname == '/portfolio' && 'active')} >PORTFOLIO</Link></div>
                                <div className="item"><Link to="/contact" style={(router.pathname == '/contact' && 'active')} >CONTACT</Link></div>
                            </div>

                        </div>
                    </div>
                </Container>
            </div>

        </React.Fragment>
    )
}
