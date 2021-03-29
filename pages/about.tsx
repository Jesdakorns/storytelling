import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Navbar from '../components/Navbar';
import ImageContent from '../components/ImageContent';
import { Button, Container } from '@material-ui/core';
import Footer from '../components/Footer';
import color from '../src/color';
import LanguageIcon from '../components/LanguageIcon';
import { TweenMax, TimelineLite, Power3, gsap, CSSPlugin } from 'gsap';
const useStyles = makeStyles({
    bg: {
        backgroundColor: color.white
    },
    bg1: {
        backgroundColor: '#e5e5e5'
    },
    content: {
        '& .content-1': {
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '50px 0',
            ['@media (max-width: 970px) ']: {
                padding: '40px 0',
                flexDirection: 'column',
                height: 'auto',
            },
        },
        '& .content-2': {
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '50px 0',
            flexDirection: 'column',
            ['@media (max-width: 970px) ']: {
                padding: '40px 0',
                flexDirection: 'column',
                height: 'auto',
            },
            '& .box-language': {
                display: 'flex',
                width: '100%',
                justifyContent: 'space-evenly',
                flexWrap: 'wrap',
                padding: '0 50px',
            }
        },
        '& .image-profile': {
            width: '300px',
            height: '300px',
            backgroundSize: 'cover',
            borderRadius: '5px',
            // opacity: 0
        },
        '& .left': {
            width: '550px',
            textAlign: 'center',
            paddingRight: '20px',
            marginBottom: '20px',
            // opacity: 0,
            ['@media (max-width: 970px) ']: {
                width: '100%',
                padding: '10px',
            },
        },
        '& .title': {
            fontSize: '26px',
            margin: 0,
            marginBottom: '20px'
        },
        '& .title-mini': {
            margin: 0,
            lineHeight: '1.5'
        },
        '& .resume-m': {
            marginRight: '10px'
        },
        '& .btn-resume': {
            background: 'linear-gradient(to right, #743ad5 0%, #d53a9d 100%)'
        },
        '& ._content':{
            fontSize: '16px'
        }

    }
});

const _RelevantExperience = [
    {
        id: 1,
        title: 'Graduation Project',
        titleMini: 'Cultural Playground Management System: Antiquities Datasets Management for Game. | 2020',
        content: ['- Web Developers, Development from the previous system. By developing the retrieval section of each museum from the web service, using the data to create a data set. In the JSON format for use in games.']
    },
    {
        id: 2,
        title: 'Internship',
        titleMini: 'Cultural Playground Management System: Game. | 2019',
        content: ['- Internship in web development position at National Electronics and Computer Technology Center (NECTEC) for 4 months.']
    },
    {
        id: 3,
        title: 'Junior',
        titleMini: 'Student Attendance Management System. | 2018',
        content: ['- Support and Web Developers, Design and Development with MVC pattern in Summer Camp Open Source Software Developers Camp#6 and Team Software Development Process Subject.', '- Software testing by automate test with robot framework.']
    },
    {
        id: 4,
        title: 'Freshman',
        titleMini: 'Coffee Store System and Tamagot Game. | 2016-2017',
        content: [' System Development with C and used OOP in C++']
    }
]

const _Education = [
    {
        id: 1,
        title: 'Burapha University',
        titme: '2016-2020',
        content: 'Faculty of Informatics, Software Engineering GPA : 3.14'
    },
    {
        id: 2,
        title: 'Nawaminthrachinuthit Suankularb Wittayalai Samutprakarn School',
        titme: '2011-2014',
        content: 'Science-Mathematics-Computer Curriculum GPA : 2.83'
    }
]
export default function about() {
    const classes = useStyles();
    let boxLeft = useRef(null);
    let boxRight = useRef(null);
    let boxLanguage = useRef(null);
    let tl1 = new TimelineLite();
    const [RelevantExperience, setRelevantExperience] = useState([])
    const [Education, setEducation] = useState([])
    useEffect(() => {
        setRelevantExperience(_RelevantExperience)
        setEducation(_Education)
        tl1.from(boxLeft.current, {
            x: '-100%',
            transformPerspective: 100,
            duration: 0.2,
            opacity: 0,
            ease: "elastic"


        }).to(boxLeft.current, {
            x: '0',
            opacity: 1

        })
        tl1.from(boxRight.current, {
            x: '150%',
            duration: 0.2,
            opacity: 0


        }).to(boxRight.current, {
            x: '0',
            opacity: 1

        })
        tl1.from(boxLanguage.current, {
            opacity: 0,
            duration: 0.2
        }).to(boxLanguage.current, {
            opacity: 1

        })
        gsap.registerPlugin(CSSPlugin)
    }, [])
    return (
        <div>
            <Navbar></Navbar>
            <ImageContent title="ABOUT"></ImageContent>
            <div className={classes.bg}>
                <Container fixed className={classes.content}>
                    <section className="content-1">
                        <div className="left" ref={boxLeft}>
                            <h3 className="title">Hi, Mr.Jesdakorn Saelor</h3>
                            <p>Web developer</p>
                            <p className="_content">  I’m a gra duate in the faculty of Informatics, Software Engineering Major at Burapha University. I have experience writing a web application with HTML, PHP, CSS, SQL, JavaScript and developing web application the format MVC.</p>
                            <a href="/file/Resume_Jesdakorn_Saelor.pdf" download ><Button className="resume-m btn-resume" size="large" variant="contained" color="primary">Resume</Button></a>
                            <a href="/file/Transcript_Jesdakorn_Saelor.pdf" download><Button variant="outlined" size="large" >Transcript</Button></a>
                        </div>
                        <div >
                            <div ref={boxRight} className="image-profile" style={{ backgroundImage: `url('/image/profile.jpg')` }}></div>
                        </div>
                    </section>
                </Container>
            </div>
            <div className={classes.bg1}>
                <div className={classes.content}>
                    <section className="content-2">
                        <h3 className="title">LANGUAGE</h3>
                        <div className="box-language" ref={boxLanguage}>
                            <LanguageIcon styleClass="html" icon="fab fa-html5" text="HTML"></LanguageIcon>
                            <LanguageIcon styleClass="css" icon="fab fa-css3-alt" text="CSS"></LanguageIcon>
                            <LanguageIcon styleClass="js" icon="fab fa-js" text="JavaScript"></LanguageIcon>
                            <LanguageIcon styleClass="node" icon="fab fa-node" text="Node.js"></LanguageIcon>
                            <LanguageIcon styleClass="vue" icon="fab fa-vuejs" text="Vue.js"></LanguageIcon>
                            <LanguageIcon styleClass="react" icon="fab fa-react" text="React.js"></LanguageIcon>
                            <LanguageIcon styleClass="bootstrap" icon="fab fa-bootstrap" text="Bootstrap"></LanguageIcon>
                        </div>
                    </section>
                </div>
            </div>
            <div className={classes.bg}>
                <div className={classes.content}>
                    <section className="content-2">
                        <h3 className="title">EDUCATION</h3>
                        <div className="timeline">
                            {
                                Education.map((value, index) => {
                                    return (
                                        <div className="item-timeline" key={index}>
                                            <h2>{value.title}<br />{value.time}</h2>
                                            <p>{value.content}</p>
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </section>
                </div>
            </div>
            <div className={classes.bg}>
                <div className={classes.content}>
                    <section className="content-2">
                        <h3 className="title">RELEVANT EXPERIENCE</h3>
                        <div className="timeline">
                            {
                                RelevantExperience.map((value, index) => {

                                    return (
                                        <div className="item-timeline" key={value.id}>
                                            <h2>{value.title}</h2>
                                            <h4 className="title-mini">{value.titleMini}</h4>
                                            {
                                                value.content.map((value, index) => {
                                                    return <p key={index}>{value}</p>
                                                })
                                            }

                                        </div>
                                    )
                                })
                            }


                        </div>
                    </section>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
