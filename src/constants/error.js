const ERROR_PATTERNS = {
  NOT_AUTHORIZED: {
    status: 401,
    message: "Unauthorized",
    messageForUser: "You do not have access rights!",
  },
  PAGE_NOT_FOUND: {
    status: 404,
    message: "Page Is Not Found",
    messageForUser: "The page you requested does not exist!",
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: "Internal Server Error",
    messageForUser: "An error occurred on the server!",
  },
  BAD_REQUEST: {
    status: 400,
    message: "Bad Request",
    messageForUser: "Your request is invalid!",
  },
};

module.exports = ERROR_PATTERNS;
