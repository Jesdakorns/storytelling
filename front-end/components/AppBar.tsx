
import { Container } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Link from '../components/Link';
import router from 'next/router';
import anime from "animejs";
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& #header': {
                userSelect: 'none',
                background: '#ffffff',
                height: '50px',
                boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.06)',
                position: 'relative',
                zIndex: '100',
                maxWidth: '100%',
            },

            '& .box-header': {
                display: 'flex',
                alignItems: 'center',
                height: '50px',
                justifyContent: 'flex-end',
            },
        }
    })
);
export default function AppBar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>

            <section id="header">
                <Container fixed>
                    <div className="box-header">
                        <Link to="/auth/login" style="">Login</Link>&nbsp; / &nbsp;<Link to="/auth/register" style="">Register</Link>
                    </div>
                </Container>
            </section>
        </div>
    )
}
