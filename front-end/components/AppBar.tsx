
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


import { connect } from 'react-redux';
import { getUser, logoutStorytelling } from './../store/actions/productsAction';
import Skeleton from '@material-ui/lab/Skeleton';
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


function AppBar({ state, getUser, logoutStorytelling }) {
    const classes = useStyles();
    const [auth, setAuth] = useState(false);
  
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    let [isLo, setisLo] = useState(false);
    useEffect(() => {

    }, [isLo])
    useEffect(() => {
        // if(localStorage.getItem('ls-u')){
        //     setisLo(true);
        // }
        getUser()


    }, [])
    useEffect(() => {

        if (!localStorage.getItem('ls-u')) {
            setLoading(false);
        } else {
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        }





    }, [state.auth.isAuth])

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    // useEffect(() => {
    //     if (localStorage.getItem('ls-u')) {
    //         router.push(`/`)
    //     }
    // }, [state.auth.isAuth])
    const clickLogout = () => {
        console.log("Logout");
        logoutStorytelling();
        
        setOpen(false);

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

    if (loading) {


        return (
            <div className={classes.root}>

                <section id="header">
                    <Container fixed>

                        <div className="box-header">
                            <Skeleton width={210} />
                        </div>


                    </Container>

                </section >
            </div>
        )
    }
    return (
        <div className={classes.root}>

            <section id="header">

                <Container fixed>
                    {(state.auth.isAuth ?
                        <div className="box-header">
                            <Button
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                                className="box-avatar"
                            >
                                <Avatar className={classes.small} alt="Profile" src={`${state.auth.user.image ? state.auth.user.image : ''}`}><i className="fas fa-user"></i></Avatar>
                                <p className="m-0 pl-2">{state.auth.user.name}</p>
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
                                                    <MenuItem onClick={clickLogout}>Logout</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                        :
                        <div className="box-header">
                            <Link to="/auth/login" style="">Login</Link>&nbsp; / &nbsp;<Link to="/auth/register" style="">Register</Link>
                        </div>
                    )}

                </Container>
            </section >
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.data,
    }
}

export default connect(mapStateToProps, { getUser, logoutStorytelling })(AppBar);