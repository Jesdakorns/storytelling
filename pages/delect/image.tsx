import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Navbar from '../components/Navbar';
import ImageContent from '../components/ImageContent';


const useStyles = makeStyles({

});
export default function about() {
    const classes = useStyles();

    return (
        <>
          <Navbar></Navbar>
          <ImageContent title="IMAGE"></ImageContent>
        </>
    )
}
