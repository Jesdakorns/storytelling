import React, { useEffect, useState } from 'react'
import Link from '../../components/Link';
import Loading from '../../components/Loading';
import AppBar from '../../components/AppBar';
import BoxLogo from '../../components/BoxLogo';
import Footer from '../../components/Footer';
import color from "../../src/color";

import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { useRouter } from 'next/router';
const axios = require('axios');
import getConfig from 'next/config'
const env = getConfig().publicRuntimeConfig;

import { connect } from 'react-redux';
import { loadStoryRecommend, getUser } from '../../store/actions/productsAction';
import { useSelector } from 'react-redux'
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .box-center': {
                display: 'flex',
                justifyContent: 'center'
            },
            '& .box-r': {
                display: 'flex',
                userSelect: 'none',
            },
            '& .box-login': {
                maxWidth: '440px',
                padding: '50px 20px'
            },
            '& .box-input': {
                marginBottom: '15px',
                userSelect: 'none',
            },
            '& .box-btn': {
                marginBottom: '15px',

            },
            '& .marked-register': {
                color: `${color.gray} !important`,
                fontWeight: 'bold'
            },
            '& .com-or': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&::before,&::after': {
                    content: '""',
                    height: '2px',
                    width: '100%',
                    background: color.light,
                    display: 'flex',
                },
                '&::before': {
                    marginRight: '10px'
                },
                '&::after': {
                    marginLeft: '10px'
                }
            },
            '& .box-google-login': {
                '& .google-btn': {
                    width: '100%'
                }
            },
            '& .box-recommend': {
                margin: '50px 0',
                '& .box-image': {
                    position: 'relative',
                    margin: '5px 0',
                    width: '100%',
                    height: '250px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    borderRadius: '20px',
                    '& .chip': {
                        position: 'absolute',
                        right: '15px',
                        top: '15px'
                    }
                }
            },
            '& .text-title': {
                fontWeight: 'revert',
            },
        }

    })
);



const responseGoogle = (response) => {
    console.log(response);
}
const responseFacebook = (response) => {
    console.log(response);
}
const Login = ({ state, loadStoryRecommend, getUser }) => {
    const classes = useStyles();
    const router = useRouter();
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)
    useEffect(() => {
        (async () => {
            await loadStoryRecommend()
            let res = await getUser();
            setUser(res.data.auth.user);
        })();
    }, [])
    useEffect(() => {
        console.log("user", user);
        if (!user) {
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        }

    }, [user])
    useEffect(() => {
        if (user) {
            setLoading(true);

            router.push(`/`);

        }
    }, [loading])

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {


        setValues({ ...values, showPassword: !values.showPassword });
        console.log(values);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    // useEffect(() => {
    //     if (localStorage.getItem('ls-u')) {
    //         router.push(`/`)
    //     }
    // }, [localStorage.getItem('ls-u')])
    const clickLogin = () => {
        // console.log(values);
        // loginStorytelling(values.email, values.password)
        axios.post(`${env.API_HOST}auth/signin`, {
            email: values.email,
            password: values.password
        }).then(function (response) {

            if (response.data.user.token != null) {
                localStorage.setItem('ls-u', response.data.user.token);
                router.push(`/`)
            } else {

            }

            console.log(response);
        }).catch(function (error) {

            console.log(error);
        });


    };



    return (

        <div className={classes.root}>

            <AppBar></AppBar>
            <BoxLogo></BoxLogo>
            {!loading ? <div className="box-center">
                <div className="box-login">
                    <div className="box-r">
                        <p>Do you have an account? &nbsp; </p><Link to="/auth/register" style="marked-register">Sign up for STORYTELLING</Link>
                    </div>
                    <div className="box-input mb-4">

                        <TextField className="mb-3" id="email-basic" label="Email" variant="outlined" fullWidth onChange={handleChange('email')} />
                        <FormControl variant="outlined" fullWidth >
                            <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            // onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            {/* {values.showPassword  ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>} */}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
                    </div>
                    <div className="box-btn">
                        <FormControl fullWidth>
                            <Button variant="contained" size="large" color="primary" disableElevation onClick={clickLogin}>Login STORYTELLING</Button>
                        </FormControl>
                    </div>
                    {/* <div className="box-com">
                        <p className="com-or">or</p>
                    </div>
                    <div className="box-google-login mb-3">
                        <GoogleLogin
                            className="google-btn"
                            clientId="263726008587-grjedbdmu4igc3jhrcl292curkqk951r.apps.googleusercontent.com"
                            buttonText="Login Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    <div className="box-facebook-login">
                        <FacebookLogin
                            appId="1088597931155576"
                            autoLoad={true}
                            fields="name,email,picture"
                            // onClick={componentClicked}
                            callback={responseFacebook} />
                    </div> */}
                </div>
            </div> :
                <div className="box-recommend">
                    <Container fixed>
                        <Grid container spacing={3} justify="center">

                            {[1, 2, 3, 4, 5, 6, 7, 8].map((value, index) =>

                                <Grid item xs={12} sm={6} md={3} lg={3} key={value}>
                                    <Skeleton className="box-image" variant="rect" />
                                    <Skeleton className="text-name text-center" variant="text" />

                                </Grid>

                            )}
                        </Grid>

                    </Container>
                </div>
            }
            <Footer></Footer>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.data,
    }
}

export default connect(mapStateToProps, { loadStoryRecommend, getUser })(Login);


