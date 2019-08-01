import { processMovies } from '../util/util';
import { movies50 } from '../resources';

export function updateMoviesDataset(movies: any) {
  return {
    type: 'UPDATE_MOVIES_DATASET',
    movies,
  };
}

async function fetchMovies() {
  return processMovies(movies50);
}

export function getMovies() {
  return function (dispatch: any) {
    fetchMovies().then(res => dispatch(updateMoviesDataset(res)));
  };
}
