const init_state = {
    id: 0,
    username: "",
    fullName: "",
    role: "",
    type: "",
    isVerified: false,
    cookieChecked: false,
  };
  
  export default (state = init_state, action) => {
    switch (action.type) {
      case "ON_LOGIN_SUCCESS":
        const { username, fullName, role, id, type, isVerified } = action.payload;
        return {
          ...state,
          username,
          fullName,
          role,
          id,
          type,
          isVerified,
          cookieChecked: true,
        };
      case "ON_LOGIN_FAIL":
        return { ...state, errMsg: action.payload, cookieChecked: true };
      case "ON_REGISTER_FAIL":
        return { ...state, errMsg: action.payload, cookieChecked: true };
      case "ON_LOGOUT_SUCCESS":
        return { ...init_state, cookieChecked: true };
      case "COOKIE_CHECK":
        return { ...state, cookieChecked: true };
      default:
        return { ...state };
    }
  };
  