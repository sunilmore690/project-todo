const initalState = {
  query: "",
  isFetching: false,
  data: { items: [] },
  error: ""
};
const movieReducers = (state = initalState, action) => {
  // if (!action.search) return state;
  switch (action.type) {
    case "RECEIVE_PROJECTS":
      return { ...state, data: action.payload, isFetching: false };
    case "SEARCH_MOVIE":
      return { ...state, isFetching: true, query: action.query };
    default:
      return state;
  }
};
export default movieReducers;
