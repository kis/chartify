import { processMovies, processAlbums } from '../util/util';

export function updateAlbumsDataset(data) {
  return {
    type: "UPDATE_ALBUMS_DATASET",
    data
  };
}

export function updateMoviesDataset(data) {
  return {
    type: "UPDATE_MOVIES_DATASET",
    data
  };
}

export function getAlbums() {
	return function (dispatch) {
		fetchAlbums().then(res => dispatch(updateAlbumsDataset(res)));
	}
}

async function fetchAlbums() {
	let albums = await fetch('https://powerful-fortress-78429.herokuapp.com/api/albums/list');
  let res = await albums.json();
	return processAlbums(res);
}

export function getMovies() {
	return function (dispatch) {
		fetchMovies().then(res => dispatch(updateMoviesDataset(res)));
	}
}

async function fetchMovies() {
	let movies = await fetch('https://powerful-fortress-78429.herokuapp.com/api/movies/list');
  let res = await movies.json();
	return processMovies(res);
}
