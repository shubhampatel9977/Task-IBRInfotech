const userModel = require("../model/userModel");
const friendRequestModel = require("../model/FriendRequestModel");
const { setImagePath, setAllImagePath } = require("../utils/setImagePath");
const {
  sendRequestSchema,
  requestIdSchema,
} = require("../validations/friendRequestValidate");

const sendFriendRequest = async (req, res) => {
  try {
    // Check Validation
    const { error, value } = sendRequestSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // Check alredy request not found
    const checkRequest = await friendRequestModel.findOne(
      { $and: [{ sender: req.userId }, { receiver: value.receiverId }] },
      { password: 0 }
    );
    if (checkRequest)
      return res.status(400).json({ message: "Request alredy found" });

    // Create friend request
    const friendRequest = new friendRequestModel({
      sender: req.userId,
      receiver: value.receiverId,
    });
    await friendRequest.save();

    return res.status(200).json({ message: "Friend request sent" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getFriendRequests = async (req, res) => {
  try {
    // Find pending friend requests for the user
    const friendRequests = await friendRequestModel
      .find(
        {
          receiver: req.userId,
          status: "pending",
        },
        { sender: 1 }
      )
      .populate("sender", { username: 1, bio: 1, profilePicture: 1 });

    if (friendRequests.length > 0) {
      const modifyData = friendRequests.map((user) => {
        if (user.sender.profilePicture) {
          user.sender = setImagePath(user.sender);
        }
        return user;
      });

      return res.status(200).json({ data: modifyData });
    }

    return res.status(200).json({ data: friendRequests });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    // Check Validation
    const { error, value } = requestIdSchema.validate(req.params);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // Update friend request status to accepted
    const requestUpdate = await friendRequestModel.findByIdAndUpdate(
      value.requestId,
      {
        status: "accepted",
      }
    );
    if (!requestUpdate)
      return res.status(400).json({ message: "Request not found" });

    return res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const declineFriendRequest = async (req, res) => {
  try {
    // Check Validation
    const { error, value } = requestIdSchema.validate(req.params);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // Delete friend request
    const deleteRequest = await friendRequestModel.findOneAndDelete({
      $and: [{ _id: value.requestId }, { status: "pending" }],
    });

    if (deleteRequest) {
      return res.status(200).json({ message: "Friend request declined" });
    }
    return res.status(400).json({ message: "Request id not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getFriendsList = async (req, res) => {
  try {
    const friendsData = await friendRequestModel.find({
      $and: [{ sender: req.userId }, { status: "accepted" }],
    }).populate("receiver", { username: 1, bio: 1, profilePicture: 1 })

    if (friendsData.length > 0) {
      const modifyData = friendsData.map((friend) => {
        if (friend.receiver.profilePicture) {
          friend.receiver = setImagePath(friend.receiver);
        }
        return friend;
      });

      return res.status(200).json({ data: modifyData });
    }

    return res.status(200).json(friendsData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  getFriendsList,
};
