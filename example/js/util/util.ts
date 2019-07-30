import _ from 'underscore';
import moment from 'moment';

interface Item {
  xValue: any;
  yValue: number;
  title: string;
}

export function processMovies(movies: Array<any>) {
  const items: Array<Item> = [];
  const dateRegex = /(\d+)[.](\d+)[.](\d+)/;

  movies.forEach((movie: any) => {
    if (!movie['дата и время']) return;

    const xValue: any = dateRegex.exec(movie['дата и время']);
    const xValueFormatted = moment(xValue[0], 'DD.MM.YYYY').format('MMM D, YYYY');

    items.push({
      xValue: xValueFormatted,
      yValue: movie['моя оценка'],
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

export function processAlbums(albumsList: Array<any>) {
  const albumsObj = _.groupBy(albumsList, (song: any) => song.Album);

  const albumNames = Object.keys(albumsObj);

  function accumTimesPlayed(memo: number, track: any) {
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
    xValue: String(album.year),
    yValue: album.timesPlayed,
    title: `${album.artist} - ${album.album}`,
  }));

  const albumsSortedByYear = _.sortBy(resAlbums, (album: any) => parseInt(album.x_value, 10));

  return albumsSortedByYear;
}
