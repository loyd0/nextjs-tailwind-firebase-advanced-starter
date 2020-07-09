import Users from '../../utils/db/Users';
import { isValidApiRequest, mustBeValid } from '../../utils/auth/validateApi';
import CRUD from '../../utils/api/CRUD';
const queryString = require('query-string');


const users = async (req, res) => {

    const valid = await isValidApiRequest(req)
    try {
        // example API function return 
        // could separate into different concerns and control by parameters in the request
        // GET: /users/:uid -> one
        // GET: /users -> all
        // PUT: /user/:uid -> update
        // DELETE: /users/:uid -> delete (might want to add admin level auth for this)
        return CRUD(req, res, valid, {
            POST: {
                privateRoute: true,
                request: async () => {

                    if (req.body.email && req.body.password) {

                        // ** TO DO ** 
                        // Currently this makes a user with all the details contained in 
                        // the request. Would be a good idea to extract these out and only use
                        // the ones you need at a later date
                        const newUser = await Users.createUser(req.body)


                        const error = newUser?.errorInfo


                        // API Error Handler needs to be built to handle common Firebase Errors
                        if (error) {
                            // Handle user already existing
                            if (error.code === "auth/email-already-exists") {
                                return res.status(422).json({
                                    ...error
                                })
                            }
                        }

                        return res.status(200).json({
                            ...newUser
                        })

                    }

                    return res.status(204).json({
                        code: "auth/credentials",
                        message: "No credentials provided"
                    })
                },
            },


            // Realistically all this code can end up in the Server Side Rendering Section or if not then it will be called by the Client Side so it is worth it
            GET: {
                request: async (query) => {
                    if (query.uid) {
                        const user = await Users.getUserByUid(query.uid)
                        return res.status(200).json({
                            ...user
                        })
                    }
                    const allUsers = await Users.getAllUsers()
                    return res.status(200).json({
                        allUsers
                    })
                }
            }
        })
    } catch (e) {

        if (e) {
            console.log(e)
            return res.status(500).send("Internal error cannot access")
        }

    }

}

export default users