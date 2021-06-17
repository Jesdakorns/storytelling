import React, { useEffect, useState } from 'react'
import Link from '../../components/Link';
import AppBar from '../../components/AppBar';
import BoxLogo from '../../components/BoxLogo';
import Footer from '../../components/Footer';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        }
    })
);
export default function story() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar></AppBar>
            <BoxLogo></BoxLogo>
            <Footer></Footer>
        </div>
    )
}

