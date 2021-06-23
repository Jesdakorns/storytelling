import Head from "next/head";
import PropTypes from "prop-types";
import React, {useEffect} from "react";
import {useStore} from "../store";
import {Provider} from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../src/theme";


function MyApp(props) {
   const {Component, pageProps} = props;
   const store = useStore(pageProps.initialReduxState);

   return (
      <>
         <Head>
            <title>Storytelling </title>
            <meta
               name="viewport"
               content="minimum-scale=1, initial-scale=1.0, width=device-width , viewport-fit=cover"
            />
            <link rel="icon" href="/assets/images/logo-bowser.png" />

            {/* main */}
            <link rel="stylesheet" href="/assets/css/style.css" />
            <script src="/assets/js/main.js"></script>
            <script src="/assets/fontawesome/original/all.js"></script>
            {/* <script src="/js/fontawesome/fa-solid.js"></script>
        <script src="/js/fontawesome/fa-regular.js"></script>
        <script src="/js/fontawesome/fa-light.js"></script>
        <script src="/js/fontawesome/fa-brands.js"></script>
        <script src="/js/fontawesome/fa-duotone.js"></script>
        <script src="/js/fontawesome/fontawesome.js"></script> */}

            {/* bootstrap 4 */}
            <link
               rel="stylesheet"
               href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            />
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>
         </Head>

         {/* show el of pages */}
         <ThemeProvider theme={theme}>
            <Provider store={store}>
               <Component {...pageProps} />
            </Provider>
         </ThemeProvider>
      </>
   );
}
export default MyApp;

MyApp.propTypes = {
   Component: PropTypes.elementType.isRequired,
   pageProps: PropTypes.object.isRequired,
};
