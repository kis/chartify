import votes from './votes.js';
import itunesData from './ituneslib.js';
import _ from 'underscore';
import moment from 'moment';

export function getInitData() {
	let items = votes.map(item => ({
		value: item["моя оценка"],
		title: (item["оригинальное название"] || item["русскоязычное название"]) + ' (' + item["год"] +')',
		date: item["дата и время"]
	}));
	items.reverse();

	let dateRegex = /(\d+)[.](\d+)[.](\d+)/;

	for (let i in items) {
		if (items[i].date) {
			let date = dateRegex.exec(items[i].date);
			items[i].date = moment(date[0], "DD.MM.YYYY").format('MMM D, YYYY');
		}
	}

	return items;
}

export function getItunesData() {
	let albumsObj = _.groupBy(itunesData, song => {
		return song["Album"];
	});

	console.log(albumsObj)

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
		value: album.timesPlayed,
		title: `${album.artist} - ${album.album}`,
		date: String(album.year)
	}));

	let albumsSortedByYear = _.sortBy(resAlbums, album => {
		return parseInt(album.date);
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