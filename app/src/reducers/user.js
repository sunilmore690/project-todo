const loggedinReducer = (state = { isLoggedIn: false, isAdmin :false}, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log('loginss',action.payload)
      return {
        isLoggedIn: true,
        user: action.payload.user,
        token: action.payload.token,
        isAdmin:action.payload.user.role === 'admin'
      };
    case "LOGOUT":
      return {isLoggedIn:true}
    default:
      return state;
  }
};
export default loggedinReducer;
