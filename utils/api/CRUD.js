//  Support function for api requests
//      - handles the standard CRUD functions with easier JSON style input
//      - handles public / private routes with a valid value 
//      - defaults to secure with both valid and privateRoute being false and true respectively
const queryString = require('query-string');


const CRUD = (req, res, valid=false, functions={}) => {
    if (!req || !res) {
        throw Error("No request data provided, please make sure req and res are passed as arguments to the CRUD function.")
    }
    const { method } = req

    const sendRequest = (func) => {
        // defaults to secure
        const queryString = require('query-string');
        const queryData = queryString.parse(req.url.replace(/\/api\/[a-z]+/,""))

        const { privateRoute=true } = func
        if (privateRoute && valid) return func.request(queryData)
        if (!privateRoute) return func.request(queryData)
        if (privateRoute && !valid) return res.status(403).send("Unauthorised")
      }
    
  
    if (method === "GET" && functions.GET) {
      return sendRequest(functions.GET)
    }
  
    if (method === "POST" && functions.POST) {
      return sendRequest(functions.POST)
    }
  
    if (method === "PUT" && functions.PUT) {
      return sendRequest(functions.PUT)
    }
  
    if (method === "DELETE" && functions.DELETE) {
      return sendRequest(functions.DELETE)
    }
  
    return res.status(405).json({
      errorInfo: {
        code: "API/Unsupported Method",
        message: "That method is not supported."
      }
    })
  }
  
  

  export default CRUD



  // Old function to delete later



// export const CRUD = (method, res, functions = {}, ) => {


//     if (method === "GET" && functions.GET) {
//       return functions.GET()
//     }
  
//     if (method === "POST" && functions.POST) {
//       return functions.POST()
//     }
  
//     if (method === "PUT" && functions.PUT) {
//       return functions.PUT()
//     }
  
//     if (method === "DELETE" && functions.DELETE) {
//       return functions.DELETE()
//     }
  
//     return res.status(405).json({
//       errorInfo: {
//         code: "API/Unsupported Method",
//         message: "That method is not supported."
//       }
//     })
  
//   }
  