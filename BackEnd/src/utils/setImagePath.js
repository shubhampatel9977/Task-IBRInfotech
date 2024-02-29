async function setImagePath(userData) {
  try{
    const localPath = `http://localhost:${process.env.PORT}/`;
    userData.profilePicture = `${localPath}${userData.profilePicture}`;
    return userData;
  } catch (error) {
    throw new Error("Error setImagePath Function");
  }
};

async function setAllImagePath(usersData) {
  try{
    const localPath = `http://localhost:${process.env.PORT}/`;
    const updateUsersData = usersData.map((user) => {
        if(user.profilePicture) {
            user.profilePicture = `${localPath}${user.profilePicture}`;
        }
        return user;
    });
    return updateUsersData;
  } catch (error) {
    throw new Error("Error setAllImagePath Function");
  }
};

module.exports = { setImagePath, setAllImagePath }