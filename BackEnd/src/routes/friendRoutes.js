const express = require("express");
const { authUser } = require("../utils/generateToken");
const {
    sendFriendRequest,
    getFriendRequests,
    acceptFriendRequest,
    declineFriendRequest,
    getFriendsList,
} = require("../controllers/friendController");

const friendRoute = express.Router();

// Middleware to protect routes
friendRoute.use(authUser);

// Routes for friend operations
friendRoute.post('/send-request', sendFriendRequest);
friendRoute.get('/requests', getFriendRequests);
friendRoute.post('/requests/:requestId/accept', acceptFriendRequest);
friendRoute.delete('/requests/:requestId/decline', declineFriendRequest);
friendRoute.get('/list', getFriendsList);

module.exports = friendRoute;