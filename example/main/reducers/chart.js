var initConfig = {
  data: [],
  itunes: []
};

function chartApp(state = initConfig, action) {
  switch (action.type) {
    case "UPDATE_MOVIES_DATASET":
      return {
        ...state,
        data: action.data
      };

    case "UPDATE_ALBUMS_DATASET":
      return {
        ...state,
        itunes: action.data
      };

    default:
      return state;
  }
}

export default chartApp;
