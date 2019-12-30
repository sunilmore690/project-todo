import axios_instance from "../api";

export const login = payload => {
  console.log("login", payload);

  return function(dispatch) {
    console.log("hi");
    return axios_instance
      .post("/authenticate", payload)
      .then(res => {
        console.log("abc", res);
        dispatch({ type: "LOGIN", payload: res });

        // dispatch({ type: "LOGOUT" });
      })
      .catch(e => {});
  };
};

export const receiveProjects = payload => {
  console.log("payload", payload);
  return {
    type: "RECEIVE_PROJECTS",
    payload
  };
};

export const getProjects = (query, page = 1) => {
  console.log("query", query);
  let startIndex = 10 * parseInt(page) - 10;
  // We can invert control here by returning a function - the "thunk".
  // When this function is passed to `dispatch`, the thunk middleware will intercept it,
  // and call it with `dispatch` and `getState` as arguments.
  // This gives the thunk function the ability to run some logic, and still interact with the store.

  return function(dispatch) {
    console.log("hi");

    return axios_instance
      .get("/projects")
      .then(response => {
        dispatch(receiveProjects(response));
      })
      .catch(error => {});
  };
};
