import { Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState, FC } from 'react';
import color from '../src/color';
import Link from '../components/Link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'




const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
        marginBottom: '30px',
        boxShadow: '1px 1px 15px #f5f7f7',
        padding: '12px',
        '& .icon-main': {
            fontSize: '65px',
            color: '#686868',
        },
        '& .text-icon': {
            margin: 0,
            fontSize: '20px'
        },
        '& .image': {
            width: '100%',
            height: '250px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            ['@media (max-width: 959px)  and (orientation: portrait)']: {
                height: '400px'
            }
        },
        '& .text-title': {
            fontSize: '26px',
            paddingTop: '12px',
        },
        '& .text-content': {
            fontSize: '16px'
        }
    }


});
const ReactViewer = dynamic(
    () => import('react-viewer'),
    { ssr: false }
)

export default function BoxBlog({ data }) {
    const classes = useStyles();
    const router = useRouter();
    const [visible, setVisible] = React.useState(false);



    return (
        <React.Fragment>
            <div className={classes.root} onClick={() => { setVisible(true); }}>
                <div className="image" style={{ backgroundImage: `url("${data.image}")` }}></div>
                <div className="text-title">{data.title}</div>
                <div className="text-content">{data.content}</div>
            </div>
            <ReactViewer
                visible={visible}
                onClose={() => { setVisible(false); }}
                images={[{ src: data.image }]}
            />
        </React.Fragment>
    )
}
