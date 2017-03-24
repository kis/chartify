import votes from './votes.js';
import itunesData from './ituneslib.js';
import _ from 'underscore';
import moment from 'moment';

export function getInitData() {
	let items = votes.map(item => ({
		x_value: item["дата и время"],
		y_value: item["моя оценка"],
		title: (item["оригинальное название"] || item["русскоязычное название"]) + ' (' + item["год"] +')'
	}));
	items.reverse();

	let dateRegex = /(\d+)[.](\d+)[.](\d+)/;

	for (let i in items) {
		if (items[i].x_value) {
			let x_value = dateRegex.exec(items[i].x_value);
			items[i].x_value = moment(x_value[0], "DD.MM.YYYY").format('MMM D, YYYY');
		}
	}

	return items;
}

export function getItunesData() {
	let albumsObj = _.groupBy(itunesData, song => {
		return song["Album"];
	});

	let albumNames = Object.keys(albumsObj);

	function accumTimesPlayed(memo, track) {
		return memo + (track['Plays'] || 0);
	}

	let albums = albumNames.map(album => ({
		artist: albumsObj[album][0]["Artist"],
		album: album,
		tracks: albumsObj[album],
		timesPlayed: _.reduce(albumsObj[album], accumTimesPlayed, 0),
		year: albumsObj[album][0]["Year"],
		dateAdded: albumsObj[album][0]["Date Added"]
	}));

	let resAlbums = albums.map(album => ({
		x_value: String(album.year),
		y_value: album.timesPlayed,
		title: `${album.artist} - ${album.album}`
	}));

	let albumsSortedByYear = _.sortBy(resAlbums, album => {
		return parseInt(album.x_value);
	});

	return albumsSortedByYear;
}

export function getRandomColor() {
	let col = function() {
		return Math.floor(Math.random() * (255 - 1 + 1)) + 1;
	};

	return {
		'background': `rgba( ${col()}, ${col()}, ${col()}, 1)`,
		'opacity': 0.3
	};
}