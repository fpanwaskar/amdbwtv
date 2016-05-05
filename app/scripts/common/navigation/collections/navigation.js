import {Collection} from 'backbone';

let navigation = new Collection([
		{name: 'Now Playing', href: '/'},
		{name: 'Upcoming Movies', href: '/#upcoming'},
		{name: 'Top Rated Movies', href: '/#top_rated'}
	]);

export default navigation;