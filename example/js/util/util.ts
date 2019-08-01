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
