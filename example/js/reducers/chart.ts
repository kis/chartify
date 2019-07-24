const initConfig = {
  movies: [],
  albums: [],
};

function chartApp(state = initConfig, action: any) {
  switch (action.type) {
    case 'UPDATE_MOVIES_DATASET':
      return {
        ...state,
        movies: action.movies,
      };

    case 'UPDATE_ALBUMS_DATASET':
      return {
        ...state,
        albums: action.albums,
      };

    default:
      return state;
  }
}

export default chartApp;
