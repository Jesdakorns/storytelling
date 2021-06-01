import { Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import color from '../src/color';
import Link from '../components/Link';
import { useRouter } from 'next/router';


const useStyles = makeStyles({
    footer: {
        backgroundColor: color.gray,
        color: color.white,
        padding: '30px',
        // border: `1px solid ${color.gray}`,
        '& .box-footer': {
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
        '& .box-social': {
            display: 'flex',
            justifyContent: 'center',
        },
        '& .dr':{
    
            height: '5px',
            background: color.white,
            margin: '0px 135px',
            ['@media (max-width: 400px)  and (orientation: portrait)']: {
                margin: '0px 105px',
            }
        }
    }


});
export default function Footer() {
    const classes = useStyles();
    const router = useRouter();

    const [open, setOpen] = useState(false)

    return (
        <React.Fragment>
            <div className={classes.footer}>
                <Container fixed>
                    <div className="box-footer">
                        <div>
                            <h3>FOLLOW US</h3>
                            <div className="dr"></div>
                            <p>Tel : 088-639-0193,  E-Mail : Jesdakorns@hotmail.com </p>
                            <div className="box-social">
                            <a href="https://www.facebook.com/trunk.noom" target="_blank"><div className="box-icon"><i className="fab fa-facebook-square"></i></div></a> 
                            <a href="https://github.com/Jesdakorns" target="_blank"><div className="box-icon"><i className="fab fa-github-alt"></i></div></a> 
                              
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

        </React.Fragment>
    )
}
