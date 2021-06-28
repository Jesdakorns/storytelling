import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@/components/Link';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Box, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Avatar from '@material-ui/core/Avatar';

import { useCookies } from 'react-cookie';

const drawerWidth = 240;

import getConfig from 'next/config'
import { Skeleton } from '@material-ui/lab';
const env = getConfig().publicRuntimeConfig;
import router, { useRouter } from 'next/router';


import { useDispatch, useSelector } from 'react-redux';
import { getUser, logoutStorytelling } from '@/store/actions/productsAction';
import Loading from '@/components/Loading';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& .toolbar-app-bar': {
            display: 'flex',
            justifyContent: 'space-between',
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
        },

    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: '#ffffff',
        color: '#000'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
        minWidth: drawerWidth
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        background: '#f9f9f9',
        minHeight: '100vh'
    },
}));
function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useEffect(() => {

        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

function Layout({ children, keyCookie }) {
    // { children, keyCookie } = props
    const classes = useStyles();
    const [width, height] = useWindowSize();
    const [cookies, setCookie, removeCookie] = useCookies(['k_user']);
    const router = useRouter();
    const counter = useSelector((state) => state['reducer'])
    const dispatch = useDispatch()

    const [logout, setLogout] = useState(false)

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    useEffect(() => {
        console.log('keyCookie', keyCookie);

        (async () => {
            let resGetUser = await dispatch(getUser());
            await console.log('resGetUser -> ', resGetUser['reducer']);

            if (keyCookie?.k_user && !resGetUser['reducer'].auth.isAuth) {
                await removeCookie('k_user')
                await router.push(`/`);
            }

            if (!keyCookie?.k_user) {
                await router.push(`/`);
            }


        })();
        console.log("router", router.pathname);

    }, [keyCookie])
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const [dataMenu, setDataMenu] = useState([
        { title: 'Dashboard', icon: 'fas fa-tachometer-alt', to: '/manage/story' },
        { title: 'My Story', icon: 'fas fa-book', to: '/manage/story/my' }
    ]);
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
    console.log(counter);

    const clickLogout = () => {
        console.log("Logout");
        setOpen(false);
        // keyCookie = null
        // setLogout(true)

        (async () => {
            let resLogout = await dispatch(logoutStorytelling());
            await console.log('resGetUser -> ', resLogout['reducer']);

            if (!resLogout['reducer'].auth.isAuth) {
                await router.push(`/`);
                await setLogout(true)

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

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const drawer = (
        <div className={classes.drawerContainer}>
            <List component="nav" aria-label="main mailbox folders">
                {dataMenu.map((value, index) => (
                    <Link to={value.to} style="" key={index}>
                        <ListItem 
                        button 
                        selected={router.pathname === value.to}
                        >

                            <ListItemIcon><i className={`${value.icon} icon-2x`}></i></ListItemIcon>
                            <ListItemText primary={value.title} />

                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div >
    );

    if (!keyCookie?.k_user) {
        return <Loading show={true}></Loading>
    }




    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className="toolbar-app-bar">
                    <Box display={{ xs: 'block', sm: 'block', md: 'none' }}>
                        <IconButton onClick={toggleDrawer('left', true)} edge="start" className="" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Box display={{ xs: 'none', sm: 'none', md: 'block' }}>
                        <Typography variant="h6" noWrap>
                            <Link to="/" style="text-uppercase">Storytelling</Link>
                        </Typography>
                    </Box>
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

                </Toolbar>
            </AppBar>
            <Box display={{ sm: 'block', md: 'block' }}>
                <Drawer
                    anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}
                    className={classes.drawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box display={{ sm: 'none', md: 'block' }}>
                <Drawer
                    anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}
                    className={classes.drawer}
                    variant={"permanent"}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    {drawer}
                </Drawer>
            </Box>
            <main className={classes.content}>
                <Toolbar />
                {children}
            </main>
        </div>
    )
}




export default Layout

