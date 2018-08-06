import { processMovies, processAlbums } from '../util/util';

const BASE_URL = 'https://powerful-fortress-78429.herokuapp.com/api';
const ALBUMS_URL = `${BASE_URL}/albums/list`;
const MOVIES_URL = `${BASE_URL}/movies/list`;

export function updateTimeChart(time) {
  return {
    type: 'UPDATE_TIME_CHART',
    time,
  };
}

export function updateAlbumsDataset(albums) {
  return {
    type: 'UPDATE_ALBUMS_DATASET',
    albums,
  };
}

export function updateMoviesDataset(movies) {
  return {
    type: 'UPDATE_MOVIES_DATASET',
    movies,
  };
}

async function fetchAlbums() {
  const albums = await fetch(ALBUMS_URL);
  const res = await albums.json();
  return processAlbums(res);
}

export function getAlbums() {
  return function (dispatch) {
    fetchAlbums().then(res => dispatch(updateAlbumsDataset(res)));
  };
}

async function fetchMovies() {
  const movies = await fetch(MOVIES_URL);
  const res = await movies.json();
  return processMovies(res);
}

export function getMovies() {
  return function (dispatch) {
    fetchMovies().then(res => dispatch(updateMoviesDataset(res)));
  };
}
