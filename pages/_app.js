import { ProvideAuth } from "../utils/auth/use-auth.js";
import { ProvideAppState } from '../providers/AppStore';
// Font Awesome Library
import { config } from '@fortawesome/fontawesome-svg-core'

// Importing CSS
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/tailwindbase.css'
import '../styles/animations.css'

// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
config.autoAddCss = false

function MyApp(props) {
  const { Component, pageProps } = props;
  return (

    // <ProvideAuth>
      <ProvideAppState>
        <Component {...pageProps} />
      </ProvideAppState>
    // </ProvideAuth>
  );
}


// // Only uncomment this method if you have blocking data requirements for
// // every single page in your application. This disables the ability to
// // perform automatic static optimization, causing every page in your app to
// // be server-side rendered.
// //
// MyApp.getInitialProps = async (appContext) => {
//   console.log('auth check')
//   const { ctx } = appContext;
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   // only run on server-side, user should be auth'd if on client-side
//   if (typeof window === 'undefined') {
//     const { authToken } = nextCookie(ctx);
//     // if a token was found, try to do SSA
//     if (authToken) {
//       try {
//         const headers = {
//           'Content-Type': 'application/json',
//            Authorization: JSON.stringify({ token: authToken })
//         };
//         // const result = await fetch('localhost:3000/api/validate', { headers });
//         // console.log(result)
//         // return { ...result, ...appProps };
//       } catch (e) {
//         // let exceptions fail silently
//         // could be invalid token, just let client-side deal with that

//         console.log(e)
//       }
//     }
//   }
//   return { ...appProps };
// }


export default MyApp

