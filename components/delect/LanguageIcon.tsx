import { Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import color from '../src/color';
import Link from '../components/Link';
import { useRouter } from 'next/router';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 25px',
        '& .icon-main': {
            fontSize: '65px',
            color: '#686868',
        },
        '& .text-icon': {
            margin: 0,
            fontSize: '20px'
        }
    }


});
export default function LanguageIcon({ styleClass, icon, text }) {
    const classes = useStyles();
    const router = useRouter();

    const [open, setOpen] = useState(false)

    return (
        <React.Fragment>
            <div className={classes.root}>
                <i className={'icon-main ' + styleClass}><i className={icon}></i></i>
                <p className="text-icon">{text}</p>
            </div>

        </React.Fragment>
    )
}
