import Admin from "./firestoreAdmin";
// Reference for interacting with the FireStore SDK
// https://firebase.google.com/docs/reference/js/firebase.firestore

// Create a new user
function create(data) {
    const { uid, ...restOfUser} = data
    return Admin.firestore()
        .collection("people")
        .doc(uid)
        .set({ ...restOfUser }, { merge: true })
}

const getByUid = async (uid) => {
    if (!uid) return { user: false, error: "No Uid Provided" }
    // get people data from your DB store
    const data = (
        await Admin
            .firestore()
            .doc(`/people/${uid}`)
            .get()
    ).data()

    console.log(`data, ${data}`)
    return data;
}

const getAll = async () => {


    // Create a reference to the collection
    let peopleRef = await Admin.firestore().collection('people');

    // Extract the query and collection of documents
    const peopleQuery = await peopleRef.get()

    // Access the docs from the query and map over the response extracting the data
    // if you wanted to remove items from the response you could do it here
    const allPeople = peopleQuery.docs.map(item => item.data())
    return allPeople
}



const People = {
    getByUid,
    getAll,
    create,
}

export default People