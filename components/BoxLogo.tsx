import React, { useEffect, useState } from 'react'
import router from 'next/router';
import anime from "animejs";
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Container, Grid, IconButton, InputBase } from '@material-ui/core';
import Link from '../components/Link';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

            '& #content-1': {
                height: 'auto',
                padding: '50px',
                background: 'linear-gradient(to bottom right, #91aa9f, #3e6071, #d7dad2)',
                display: 'flex',
                alignItems: 'center',
                color: '#fff',
                ['@media (max-width: 666px)']: {
                    padding: '50px 0px',
                }
            },
            '& .box-content-1': {
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
            },
            '& .text-logo ': {
                textAlign: 'center',
                fontSize: ' 3.5rem',
                marginBottom: '20px',
            },
            '& .ml6': {
                position: 'relative',
                fontWeight: '900',
                fontSize: '1.3em',
                ['@media (max-width: 666px)']: {
                    fontSize: '1em',
                },
                '& .text-wrapper': {
                    position: 'relative',
                    display: 'inline-block',
                    paddingTop: '0.2em',
                    paddingRight: '0.05em',
                    paddingBottom: '0.1em',
                    overflow: 'hidden',
                },
                '& .letter': {
                    display: 'inline-block',
                    lineHeight: '1em',
                }
            },
            '& .box-search': {
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                background: 'rgb(255, 255, 255)',
                borderRadius: '5px',
                padding: '5px 20px',
                border: '1px solid #eee',
                '& .input-search': {
                    width: '100%'
                },
                '& .box-icon-search': {
                    width: '40px',
                    height: '40px'
                }
            }

        }
    })
);
export default function BoxLogo() {
    const classes = useStyles();
    const [search, setSearch] = useState("");
    // <============= Search ==================>
    function handleChangeSearch(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }
    function submitSearch(e) {
        e.preventDefault()
        router.push({
            pathname: '/search', query: { keyword: search }
        })
    }
    useEffect(() => {
        var textWrapper = document.querySelector('.ml6 .letters');
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({ loop: true })
            .add({
                targets: '.ml6 .letter',
                translateY: ["1.1em", 0],
                translateZ: 0,
                duration: 750,
                delay: (el, i) => 50 * i
            }).add({
                targets: '.ml6',
                opacity: 0,
                duration: 1000,
                easing: "easeOutExpo",
                delay: 1000
            });

    }, [])
    return (
        <div className={classes.root}>
            <section id="content-1">
                <Container fixed>
                    <div className="box-content-1">
                        <div className="text-logo">
                            <h1 className="ml6">
                                <Link to="/" style="">
                                    <span className="text-wrapper">
                                        <span className="letters">Storytelling</span>
                                    </span>
                                </Link>
                            </h1>
                        </div>
                        <Grid container spacing={3} justify="center">
                            <Grid item xs={12} md={6}>
                                <div className="box-search">
                                    <InputBase className="input-search" value={search} onChange={handleChangeSearch} placeholder="ค้นหา" />
                                    <IconButton className="box-icon-search" type="submit" aria-label="search" onClick={submitSearch}>
                                        <i className="far fa-search"></i>
                                    </IconButton>
                                </div>
                            </Grid>

                        </Grid>

                    </div>
                </Container>
            </section>
        </div>
    )
}
