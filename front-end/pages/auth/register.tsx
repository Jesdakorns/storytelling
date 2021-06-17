import React, { useEffect, useState } from 'react'
import Link from '../../components/Link';
import AppBar from '../../components/AppBar';
import BoxLogo from '../../components/BoxLogo';
import Footer from '../../components/Footer';
import color from "../../src/color";
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
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
            '& .box-image': {
                width: '100%',
                height: 'auto',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }
        }
    })
);
interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
}
export default function register() {
    const classes = useStyles();
    const [v_image, setImage] = useState('')
    const [values, setValues] = React.useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {


        setValues({ ...values, showPassword: !values.showPassword });
        console.log(values);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onFileChange = event => {
        console.log(event.target.files[0]);
        setImage(URL.createObjectURL(event.target.files[0]));
        // Update the state
        // this.setState({ selectedFile: event.target.files[0] });

    };
    return (
        <div className={classes.root}>
            <AppBar></AppBar>
            <BoxLogo></BoxLogo>
            <div className="box-center">
                <div className="box-login">
                    <div className="box-r">
                        <p>Do you have an account? &nbsp; </p><Link to="/auth/login" style="marked-register">Sign in for STORYTELLING</Link>
                    </div>
                    <div className="box-input mb-4">

                        <TextField className="mb-3" id="username-basic" label="Username" variant="outlined" fullWidth />
                        <FormControl variant="outlined" fullWidth className="mb-3">
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
                        <TextField className="mb-3" type="email" id="name-basic" label="Full Name" variant="outlined" fullWidth />
                        <TextField className="mb-3" type="email" id="email-basic" label="Email" variant="outlined" fullWidth />
                        <div className="box-upload">

                            <div className="file-container">
                                <div className="file-overlay"></div>
                                <div className="file-wrapper">
                                    <input className="file-input" id="js-file-input" type="file" onChange={onFileChange} />
                                    <div className="file-content">
                                        {v_image === '' ? (
                                            <div className="file-infos">
                                                <p className="file-icon">
                                                    <i className="far fa-images fa-5x icon"></i>
                                                    {/* <i className="fas fa-file-upload fa-7x"></i> */}
                                                    <span className="icon-shadow"></span>
                                                    <span>Click to browse
                                                        <span className="has-drag"> or drop image here</span>
                                                    </span>
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="box-image" style={{ backgroundImage: `url('${v_image}')` }}>

                                            </div>

                                        )}



                                        {/* <p className="file-name" id="js-file-name">No file selected</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="box-btn">
                        <FormControl fullWidth>
                            <Button variant="contained" size="large" color="primary" disableElevation>Sign up STORYTELLING</Button>
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
// import React, { useEffect, useState } from 'react'
// import Link from '../../components/Link';
// import AppBar from '../../components/AppBar';
// import BoxLogo from '../../components/BoxLogo';
// import Footer from '../../components/Footer';
// import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         root: {
//         }
//     })
// );
// export default function login() {
//     const classes = useStyles();
//     return (
//         <div className={classes.root}>
//             <AppBar></AppBar>
//             <BoxLogo></BoxLogo>
//             <Footer></Footer>
//         </div>
//     )
// }

