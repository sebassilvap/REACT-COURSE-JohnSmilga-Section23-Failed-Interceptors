// this util is used as utils approach for the authorization header
// this won't be used because the selected apporach will be axios interceptors approach

const authHeader = (thunkAPI) => {
  return {
    headers: {
      authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    },
  };
};

export default authHeader;
