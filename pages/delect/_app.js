import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeProvider} from "@material-ui/core/styles";
// import withRedux from "next-redux-wrapper";
import Head from "next/head";
import PropTypes from "prop-types";
import React, {useEffect} from "react";
// import { Provider } from "react-redux";

import theme from "../src/theme";
// import { initializeStore } from "../store/store";
// import { useStore } from "../store";

function MyApp(props) {
   const {Component, pageProps} = props;

   // const store = useStore(pageProps.initialReduxState);

   useEffect(() => {
      const jssStyles = document.querySelector("#jss-server-side");
      if (jssStyles) {
         jssStyles.parentElement.removeChild(jssStyles);
      }
   }, []);

   return (
      <React.Fragment>
         <Head>
            <title>Profile</title>

            <meta
               name="viewport"
               content="minimum-scale=1, initial-scale=1.0, width=device-width , viewport-fit=cover"
            />
            <link rel="icon" href="/image/icon-bowser.png"></link>
            <link
               rel="stylesheet"
               href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <link
               rel="stylesheet"
               href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <link
               href="https://fonts.googleapis.com/css2?family=Prompt:wght@100;200;300;400;500;600;700;800;900&display=swap"
               rel="stylesheet"
            />
            <link
               rel="stylesheet"
               href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
               integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
               crossOrigin="anonymous"
            />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="stylesheet" href="/css/main.css" />
            <link
               href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap"
               rel="stylesheet"
            />
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
            {/* <script src="/jquery.svg3dtagcloud.min.js"></script> */}
            <script src="/js.js"></script>
            <script src="/js/fontawesome/fa-solid.js"></script>
            <script src="/js/fontawesome/fa-regular.js"></script>
            <script src="/js/fontawesome/fa-light.js"></script>
            <script src="/js/fontawesome/fa-brands.js"></script>
            <script src="/js/fontawesome/fa-duotone.js"></script>
            <script src="/js/fontawesome/fontawesome.js"></script>
         </Head>

         <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <Provider store={store}> */}
            <Component {...pageProps} />
            {/* </Provider> */}
         </ThemeProvider>
         <style jsx global>{`
            @import url("https://fonts.googleapis.com/css2?family=Prompt:wght@200&display=swap");
            html,
            body {
               padding: 0;
               margin: 0;
               font-family: "Prompt", sans-serif;
               background: #686868;
            }
            ._main {
               height: "100vh";
               height: calc(var(--vh, 1vh) * 100);
            }
            .react-viewer-close {
               position: fixed;
               top: 0px;
               right: 0px;
               overflow: hidden;
               width: 70px !important;
               height: 70px !important;
               border-radius: 0 0 0 90px !important;
               cursor: pointer;
               z-index: 1010;
            }
            .react-viewer-close > i {
               position: relative !important;
               top: 18px !important;
               left: 36px !important;
               font-size: 20px !important;
            }
            #__next {
               overflow: hidden !important;
               position: relative;
               width: 100%;
            }
            #__next.active {
               position: fixed;
            }
            * {
               box-sizing: border-box;
            }
            a {
               text-decoration: none;
            }
            @keyframes animate1 {
               0% {
                  transform: translateX(100%);
               }
               100% {
                  transform: translateX(-100%);
               }
            }
            @keyframes animate2 {
               0% {
                  transform: translateX(0%);
               }
               100% {
                  transform: translateX(-200%);
               }
            }
            @keyframes animate3 {
               0% {
                  transform: translateX(-100%);
               }
               100% {
                  transform: translateX(100%);
               }
            }
            @keyframes animate4 {
               0% {
                  transform: translateX(-200%);
               }
               100% {
                  transform: translateX(0%);
               }
            }
         `}</style>
      </React.Fragment>
   );
}
export default MyApp;

// MyApp.getInitialProps = async ({ Component, ctx }) => {
//    const pageProps = Component.getInitialProps
//       ? await Component.getInitialProps(ctx)
//       : {};
//    return { pageProps: pageProps };
// };
MyApp.propTypes = {
   Component: PropTypes.elementType.isRequired,
   pageProps: PropTypes.object.isRequired,
};
