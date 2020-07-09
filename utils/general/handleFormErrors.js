export default function handleFormErrors(code, setError) {

    if (code && setError) {
        switch (code) {
            case "auth/email-already-exists":
                return setError("email", "alreadyExists", "A user with that email address already exists. Please log in or try a different email.");
            case "auth/credentials":
                return setError("noCredentials", "alreadyExists", "A user with that email address already exists. Please log in or try a different email.");
            case "auth/user-not-found":
                return setError("login", "notFound", "There is no matching user with those details, please try again.");
            default:
                // Catch all for other errors
                return setError("serverError", "internalError", "Server error, please contact a system administrator in order to alert them to the issue.")
        }
    } else {
        console.log(Error("No error code, or setError value provided."))
    }

}