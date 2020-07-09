import cookies from 'next-cookies'
import * as admin from 'firebase-admin'


export const isValidApiRequest = async (req) => {
    // if the request is sent from a server then there needs to be a Header with Bearer authentication
    const token = req.headers.authorization
    // Remove the bearer part of the token and just bring back the actual token
    const serverToken = token && token.replace('Bearer ', '')

    // if the request is sent from the browser then the token will be a cookie
    const { authToken } = await cookies({ req });

    // could add in levels of validation in this function i.e. admin can use certain routes but others cannot etc
    const { valid } = await validateToken(authToken || serverToken)
    return valid
};



export const mustBeValid = async (func, valid, res) => {
    if (!valid) {
        return res.status(403).send("Unauthorised")
    }
    return func()
}



// To use with SSR and validate the token that is sent with the headers 
// Uses Firebase to verify token as it is a FB token
// would want to swap out to another authentication service and validate the 
// token that is sent with requests
export const validateToken = async (token) => {
    if (!token) return false
    const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                // https://stackoverflow.com/a/41044630/1332513
                privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
                // privateKey: process.env.FIREBASE_PRIVATE_KEY
            }),
            databaseURL: process.env.FIREBASE_DATABASE_URL,
        })
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token, true);
        if (decodedToken.uid) {
            return {
                valid: true,
                uid: decodedToken.uid
            }
        }
    } catch (e) {
        // console.log(e)
        if (e.code === "auth/id-token-expired") {
            console.log("ERROR: expired token")
            return {
                valid: false,
                message: "Token Expired"
            }
        }
        return {
            valid: false
        }
    }
}




export const validateTokenAndGetUser = (token) => {

}
