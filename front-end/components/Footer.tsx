
import { Container, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Link from '../components/Link';
import router from 'next/router';
import anime from "animejs";
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import color from "../src/color";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& #footer': {
                width: '100%',
                minHeight: '300px',
                backgroundColor: color.light,
                '& .box-footer': {
                    color: color.gray600,
                    padding: '70px 20px',
                    '& .text-title': {
                        fontWeight: 'bold'
                    }
                }
            },
            '& .copyright': {
                padding: '10px 0'
            },
            '& .box-icon': {
                fontSize: '1.3rem',
                marginRight: '10px',
                width: '20px',
            },
            '& .box-follow': {
                display: 'flex',

            }
        }
    })
);
export default function Footer() {
    const classes = useStyles();
    const [YY, setYY] = useState(0);
    useEffect(() => {
        var d = new Date();
        console.log(d.getFullYear());

        setYY(d.getFullYear());
    }, [])
    return (
        <div className={classes.root}>

            <section id="footer">
                <Container fixed>
                    <div className="box-footer">
                        <Grid container spacing={3} >

                            <Grid item xs={12} md={3} >
                                <h3 className="text-title">Storytelling</h3>
                            </Grid>
                            <Grid item xs={12} md={3} >
                                <h5 className="text-title mb-3">Quick Links</h5>
                                <Link to="/" style=""><p>Home</p></Link>
                            </Grid>
                            <Grid item xs={12} md={3} >
                                <h5 className="text-title mb-3">Information</h5>
                                <Link to="/" style=""><p>Contact</p></Link>
                            </Grid>
                            <Grid item xs={12} md={3} >
                                <h5 className="text-title mb-3">Follow Us</h5>
                                <div className="box-follow">

                                    <i className="box-icon">
                                        <Link to="/" style="">
                                            <i className="fab fa-facebook-square"></i>
                                        </Link>
                                    </i>

                                    <i className="box-icon">
                                        <Link to="/" style="">
                                            <i className="fab fa-instagram"></i>
                                        </Link>
                                    </i>

                                </div>


                            </Grid>


                        </Grid>

                    </div>

                </Container>
            </section>
            <Container fixed>
                <div className="copyright">Copyright © {YY} Storytelling - All Rights Reserved</div>
            </Container>
        </div>
    )
}
