const userModel = require("../model/userModel");
const friendRequestModel = require("../model/FriendRequestModel");
const { updateUserSchema } = require("../validations/userValidate");
const { setImagePath, setAllImagePath } = require("../utils/setImagePath");

const userUpdate = async (req, res) => {
  try {
    // Check Validation
    const { error, value } = updateUserSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // Check file is upload or not
    if (req.file) {
      value.profilePicture = req.file.path;
    }

    const userId = req.userId;

    const uploadUserData = await userModel.findByIdAndUpdate(userId, value);
    if (uploadUserData)
      return res.status(200).json({ message: "Update user successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const userDetails = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId, { password: 0, __v: 0 });
    if (userData) {
      if(userData.profilePicture) {
        const updateUserData = await setImagePath(userData);
        return res.status(200).json({ data: updateUserData });
      } else {
        return res.status(200).json({ data: userData });
      }
    }
    return res.status(200).json({ message: 'User not found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const userId = req.userId;

    const usersData = await userModel.find({ _id : { $ne: userId }},{ username: 1, bio: 1, profilePicture: 1  });
    if(usersData.length > 0) {
      const updateUsersData = await setAllImagePath(usersData);
      return res.status(200).json({ data: updateUsersData });
    }
    return res.status(200).json({ data: usersData });

    // const currentUser = await userModel.findById(userId, { password: 0, __v: 0 });

    // const allRequest = await friendRequestModel.find({sender: userId, status: "pending"}, { receiver: 1});

    // const allUsers = await userModel.find({ _id : { $ne: userId }},{ username: 1, bio: 1, profilePicture: 1 });

    // const friendsIds = currentUser.friends;
    // const pendingReqIds = allRequest.map((item) => item.receiver);

    // allUsers.map((user) => {
    //   if (friendsIds.includes(user._id)) {
    //     user.relationshipsStatus = "friends";
    //   } else if (pendingReqIds.includes(user._id)) {
    //     user.relationshipsStatus = "requestSend";
    //   } else {
    //     user.relationshipsStatus = "none";
    //   }
    // });
    // return res.status(200).json({ allUsers });


  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { userUpdate, userDetails, getAllUsers };
