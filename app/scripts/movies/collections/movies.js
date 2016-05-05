import Collection from 'common/collections/base';
import MovieModel from 'movies/models/movie';

export default Collection.extend({
	currentPage: 1,
	currentPath: '',
	model: MovieModel,

	getPath() {
		return `/movie/${this.currentPath}`;
	},

	getNowPlaying() {
		this.currentPath = 'now_playing';
		this.fetch({data: {'api_key': '1a3c5ce91fc7f75e67d8f86d5e100d39', page: this.currentPage}});
	},

	getUpcoming() {
		this.currentPath = 'upcoming';
		this.fetch({data: {'api_key': '1a3c5ce91fc7f75e67d8f86d5e100d39', page: this.currentPage}});
	},

	getTopRated() {
		this.currentPath = 'top_rated';
		this.fetch({data: {'api_key': '1a3c5ce91fc7f75e67d8f86d5e100d39', page: this.currentPage}});
	}
})
