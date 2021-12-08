const getMatchedUserInfo = (users, userLoggedIn) => {
  console.log("users", users);
  console.log("userLoggedIn", userLoggedIn);
  const newUsers = { ...users };
  console.log({ newUsers });
  delete newUsers[userLoggedIn];

  const [id, user] = Object.entries(newUsers).flat();

  return { id, ...user };
};

export default getMatchedUserInfo;
