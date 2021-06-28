import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { connect } from 'react-redux'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import getConfig from 'next/config'
import dynamic from 'next/dynamic';
const env = getConfig().publicRuntimeConfig;
import { useCookies } from 'react-cookie';

import { getUser } from '@/store/actions/productsAction';

import AppBar from '@/components/AppBar';
import BoxLogo from '@/components/BoxLogo';
import Footer from '@/components/Footer';
import Link from '@/components/Link';

import color from '@/src/color';

import { Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';



const content = ({ state, getUser }) => {
  const classes = useStyles();
  const router = useRouter();
  const [values, setValues] = useState({
      email: '',
      password: '',
      showPassword: false,
  });
  const [cookies, setCookie] = useCookies(['k_user']);
  const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
  };
  const clickLogin = () => {
      axios.post(`${env.API_HOST}auth/signin`, {
          email: values.email,
          password: values.password
      }).then(function (response) {

          if (response.data.user.token != null) {
              setCookie('k_user', response.data.user.token, { path: '/' });
              // localStorage.setItem('ls-u', response.data.user.token);
              router.push(`/`)
          } else {

          }
          console.log(response);
      }).catch(function (error) {

          console.log(error);
      });
  };

  if(cookies.k_user){
      return ''
  }

  return (
      <div className={classes.root}>
          <AppBar></AppBar>
          <BoxLogo></BoxLogo>
          <div className="box-center">
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
          </div>
          <Footer></Footer>
      </div>
  )

}
const mapStateToProps = (state) => ({
  state: state.data
})

const mapDispatchToProps = {
  getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(content)




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
                    marginLeft: '10px',
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
