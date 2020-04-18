import _ from 'underscore';
import moment from 'moment';

interface Bar {
  xValue: any;
  yValue: number;
  title: string;
}

interface Movie {
  'дата и время': string;
  'моя оценка': number;
  'оригинальное название': string;
  'русскоязычное название': string;
  'год': string;
}

export function processMovies(movies: Movie[]) {
  const items: Bar[] = [];
  const dateRegex = /(\d+)[.](\d+)[.](\d+)/;

  movies.forEach((movie: Movie) => {
    if (!movie['дата и время']) return;

    const xValue = dateRegex.exec(movie['дата и время']) as string[];
    const xValueFormatted = moment(_.first(xValue), 'DD.MM.YYYY').format('MMM D, YYYY');

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
