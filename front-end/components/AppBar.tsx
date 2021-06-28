
import { Container } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Link from '../components/Link';
import router from 'next/router';
import anime from "animejs";
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';


import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Avatar from '@material-ui/core/Avatar';
import { useCookies } from 'react-cookie';

import { connect, useDispatch, useSelector } from 'react-redux';
import { getUser, logoutStorytelling } from './../store/actions/productsAction';



import getConfig from 'next/config'
const env = getConfig().publicRuntimeConfig;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        small: {
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
        root: {

            '& #header': {
                userSelect: 'none',
                background: '#ffffff',
                height: '50px',
                boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.06)',
                position: 'relative',
                zIndex: '100',
                maxWidth: '100%',
                minHeight: '50px'
            },

            '& .box-header': {
                minWidth: '50px',
                display: 'flex',
                alignItems: 'center',
                height: '50px',
                justifyContent: 'flex-end',
            },
            '& .box-avatar': {
                display: 'flex',
            },
            '& .menu-click': {
                minWidth: '250px',
                left: '-20px !important',
            }
        }
    })
);


function AppBar({ keyCookie }) {
    const classes = useStyles();
    const [cookies, setCookie, removeCookie] = useCookies(['k_user']);
    const counter = useSelector((state) => state['reducer'])
    const dispatch = useDispatch()

    const [logout, setLogout] = useState(false)

    useEffect(() => {
        console.log('keyCookie', keyCookie);

        (async () => {
            let resGetUser = await dispatch(getUser());
            await console.log('resGetUser -> ', resGetUser['reducer']);

            if (keyCookie?.k_user && !resGetUser['reducer'].auth.isAuth) {
                await removeCookie('k_user')
                await router.push(`/`);
            }

        })();

    }, [keyCookie])
    useEffect(() => {
        console.log('Appbar -> ', keyCookie?.k_user);

    }, [keyCookie])

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        console.log(event.target.dataset);

        if (event.target.dataset?.to) {
            router.push(event.target.dataset.to)
        }

        setOpen(false);
    };

    const clickLogout = () => {
        console.log("Logout");
        setOpen(false);
        // keyCookie = null
        // setLogout(true)

        (async () => {
            let resLogout = await dispatch(logoutStorytelling());
            await console.log('resGetUser -> ', resLogout['reducer']);

            if (!resLogout['reducer'].auth.isAuth) {
                setLogout(true)
            }



        })();

    }

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>

            <section id="header">

                <Container fixed>
                    {keyCookie?.k_user && !logout ?
                        <div className="box-header">
                            <Button
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                                className="box-avatar"
                            >
                                {counter?.auth?.user?.image &&
                                    <Avatar className={classes.small} alt="" src={`${env.API_BASE + counter?.auth?.user?.image}`}>
                                        {/* <i className="fas fa-user"></i> */}
                                    </Avatar>
                                }

                                <p className="m-0 pl-2">{counter?.auth?.user?.name}</p>
                            </Button>
                            <Popper className="menu-click" open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (

                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper >
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>

                                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                                    <MenuItem onClick={handleClose} data-to="/manage/story">Manage Story</MenuItem>
                                                    <MenuItem onClick={clickLogout}>Logout</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div> :
                        <div className="box-header">
                            <Link to="/auth/login" style="">Login</Link>&nbsp; / &nbsp;<Link to="/auth/register" style="">Register</Link>
                        </div>
                    }




                </Container>
            </section >
        </div >
    )
}

export default AppBar;