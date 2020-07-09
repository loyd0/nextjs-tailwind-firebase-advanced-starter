export const getHashRoute = ( router ) => {
    if (!router) return ""
    return router.asPath.replace(router.route, "") 
}
export const createHashPath = ( toHash ) => {
    if (!toHash) {
        Error("No toHash provided, cannot create hashPath")
        return "" 
    }
    return `#${toHash.toLowerCase().split(" ").join("_")}`
}