import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import color from '../src/color';
import Link from '../components/Link';
import { useRouter } from 'next/router';


const useStyles = makeStyles({
    root: {
        '& .image-content':{
            width: '100%',
            height: '30vw',
            backgroundSize: 'cover',
            backgroundPositionY: 'bottom',
            backgroundPositionX: 'center',
            position: 'relative',
            ['@media (max-width: 1200px) ']: {
                height: '35vw',
            },     
            ['@media (max-width: 760px)  and (orientation: portrait)']: {
                height: '50vw',
            },
           
            '& .text-main':{
                position: 'absolute',
                top: '57px',
                margin: 0,
                color: color.white,
                fontSize: '55px',
                width: '100%',
                textAlign: 'center',
                ['@media (max-width: 815px)  ']: {
                    fontSize: '40px',
                    top: '45px',
                },
            }
        }

    },


});
export default function Navbar({title}) {
    const classes = useStyles();
    const router = useRouter();


    return (
        <React.Fragment>

            <div className={classes.root}>
             
                <div className="image-content" style={{ backgroundImage: `url('/image/wallpaperflare.jpg')` }}>   <h1 className="text-main">{title}</h1></div>
            </div>

        </React.Fragment>
    )
}
