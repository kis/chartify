import * as util from "../util/util";

var initConfig = {
  data: [],
  config: {
    theme: "default",
    width: 50,
    height: 10,
    box_radius: 8,
    line: false,
    line_only: false,
    bordered: false,
    blink: false
  },
  itunes: [],
  config_itunes: {
    theme: "blue",
    width: 50,
    height: 10,
    box_radius: 0,
    line: false,
    line_only: false,
    bordered: false,
    blink: false
  }
};

function chartApp(state = initConfig, action) {
  switch (action.type) {
    case "INIT_CONFIG":
      return {
        ...state,
        config: state.config,
        config_itunes: state.config_itunes
      };

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

    case "UPDATE_CHART":
      if (action.chart == "music")
        return { ...state, itunes: action.data, config_itunes: action.config };
      if (action.chart == "films")
        return { ...state, data: action.data, config: action.config };

    default:
      return state;
  }
}

export default chartApp;
