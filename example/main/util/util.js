import votes from './votes.json';

export function getInitData() {
	let items = votes.map(item => ({
		value: item["моя оценка"],
		title: item["оригинальное название"],
		date: item["дата и время"]
	}));
	items.reverse();

	let dateRegex = /(\d+)[.](\d+)[.](\d+)/;

	for (let i in items) {
		if (items[i].date) {
			let date = dateRegex.exec(items[i].date);
			items[i].date = date && date[0];
		}
	}

	return items;
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