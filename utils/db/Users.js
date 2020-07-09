import Admin from "./firestoreAdmin";
import { useQuery } from './helpers';

// Reference for interacting with the FireStore SDK
// https://firebase.google.com/docs/reference/js/firebase.firestore

const fireStore = Admin.firestore()



/**** USERS ****/

// Fetch user data
export function useUser(uid) {
    // useQuery is a helper that stashes that returns the previous cached result before loading the fresh data
    return useQuery(uid && Admin.firestore().collection("users").doc(uid));
}

// Update an existing user
export function updateUser(uid, data) {
    return Admin.firestore().collection("users").doc(uid).update(data);
}

// Create a new user
function createUser(data) {
    const { uid, ...restOfUser} = data
    return Admin.firestore()
        .collection("users")
        .doc(uid)
        .set({ ...restOfUser }, { merge: true })
}



function registerAndCreateUser(user) {
    return Admin
    .auth()
    .createUser({...user})
    .then(function(userRecord) {
        console.log(userRecord)

        const { password, ...restOfUser } = user
        return Admin.firestore()
        .collection("users")
        .doc(userRecord.uid)
        .set({ uid: userRecord.uid, ...restOfUser }, { merge: true })
        .then(() => userRecord.user)
    }).catch(e => {
        console.log(e)
        return e
    })
}


const getUserByUid = async (uid) => {
    if (!uid) return { user: false, error: "No Uid Provided" }
    // get user data from your DB store
    const data = (
        await Admin
            .firestore()
            .doc(`/users/${uid}`)
            .get()
    ).data()



    // Update this so the usersAUTH and usersDB are the same

    const user = await Admin.auth().getUser(uid);
    const result = {
        user: {
            uid: user.uid,
            email: user.email,
            ...data,
        }
    };
    return result;
}

const getAllUsers = async () => {


    // Create a reference to the collection
    let usersRef = await Admin.firestore().collection('users');

    // Extract the query and collection of documents
    const userQuery = await usersRef.get()

    // Access the docs from the query and map over the response extracting the data
    // if you wanted to remove items from the response you could do it here
    const allUsers = userQuery.docs.map(item => item.data())

    return allUsers
}



const Users = {
    getUserByUid,
    getAllUsers,
    createUser,
    registerAndCreateUser
}

export default Users