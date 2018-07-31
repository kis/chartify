const initConfig = {
  // time: [],
  data: [],
  itunes: [],
};

function chartApp(state = initConfig, action) {
  switch (action.type) {
    // case 'UPDATE_TIME_CHART':
    //   const newTime = {
    //     x_value: action.data[0].value,
    //     y_value: Number(action.data[0].value.substr(-2)),
    //     title: action.data[0].value,
    //   };
    //   return {
    //     ...state,
    //     time: [...state.time, newTime],
    //   };

    case 'UPDATE_MOVIES_DATASET':
      return {
        ...state,
        data: action.data,
      };

    case 'UPDATE_ALBUMS_DATASET':
      return {
        ...state,
        itunes: action.data,
      };

    default:
      return state;
  }
}

export default chartApp;
