import _ from 'underscore';
import moment from 'moment';

export function processMovies(movies) {
  const items = [];
  const dateRegex = /(\d+)[.](\d+)[.](\d+)/;

  movies.forEach((movie) => {
    if (!movie['дата и время']) return;

    const xValue = dateRegex.exec(movie['дата и время']);
    const xValueFormatted = moment(xValue[0], 'DD.MM.YYYY').format('MMM D, YYYY');

    items.push({
      x_value: xValueFormatted,
      y_value: movie['моя оценка'],
      title:
        `${movie['оригинальное название'] || movie['русскоязычное название']
        } (${
          movie['год']
        })`,
    });
  });

  items.reverse();
  return items;
}

export function processAlbums(albumsList) {
  const albumsObj = _.groupBy(albumsList, song => song.Album);

  const albumNames = Object.keys(albumsObj);

  function accumTimesPlayed(memo, track) {
    return memo + (track.Plays || 0);
  }

  const albums = albumNames.map(album => ({
    artist: albumsObj[album][0].Artist,
    album,
    tracks: albumsObj[album],
    timesPlayed: _.reduce(albumsObj[album], accumTimesPlayed, 0),
    year: albumsObj[album][0].Year,
    dateAdded: albumsObj[album][0]['Date Added'],
  }));

  const resAlbums = albums.map(album => ({
    x_value: String(album.year),
    y_value: album.timesPlayed,
    title: `${album.artist} - ${album.album}`,
  }));

  const albumsSortedByYear = _.sortBy(resAlbums, album => parseInt(album.x_value, 10));

  return albumsSortedByYear;
}

export function getRandomColor() {
  const col = function () {
    return Math.floor(Math.random() * (255 - 1 + 1)) + 1;
  };

  return {
    background: `rgba( ${col()}, ${col()}, ${col()}, 1)`,
    opacity: 0.3,
  };
}
