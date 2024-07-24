async function errorHandler(error, req, res, next) {
    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
        case "ValidationErrorItem":
            let message = error.errors.map(el => el.message)
            res.status(400).json({
                message: message[0]
            })
            break;
        case "INPUT_NOT_VALID":
            res.status(400).json({
                message: "Invalid input: Please check your data and try again"
            })
            break;
        case "MUST_PAID":
            res.status(400).json({
                message: "This feature only for supporter user"
            })
            break;
        case "ALREADY_FAV":
            res.status(400).json({
                message: "This recipe is already marked as favorite"
            })
            break;
        case "USERNAME_REQUIRED":
            res.status(400).json({
                message: "Username is required. Please provide your username and try again"
            })
            break;
        case "PASSWORD_REQUIRED":
            res.status(400).json({
                message: "Password is required. Please provide your password and try again"
            })
            break;
        case "AUTH_NOT_VALID":
            res.status(401).json({
                message: "Invalid username or password. Please try again"
            })
            break;
        case "JsonWebTokenError":
            res.status(401).json({
                message: "Invalid token: Please log in again"
            })
            break;
        case "UNAUTHORIZED":
            res.status(401).json({
                message: "Access denied: Please log in first"
            })
            break;
        case "FORBIDDEN":
            res.status(403).json({
                message: "Access denied: You do not have permission to access this resource"
            })
            break;
        case "ITEM_NOT_FOUND":
            res.status(404).json({
                message: "Item not found. Please check the ID and try again"
            })
            break;
        case "IMGURL_NOT_VALID":
            res.status(400).json({
                message: "Image URL is required. Please provide a valid image URL and try again"
            })
            break;
        default:
            res.status(500).json({
                message: "Internal Server Error. Please try again later"
            })
            break;
    }
}

module.exports = errorHandler;
