import $ from 'jquery';
import Moment from 'moment';
import Radio from 'backbone.radio';

import Model from 'common/models/base';
import VideoCollection from 'movies/collections/videos';

let appStateChannel = Radio.channel('appState');
export default class MovieModel extends Model {
	initialize(attributes, options) {
		super.initialize(arguments);

		this.fetchVideos = options && options.fetchVideos;
		if (this.fetchVideos) {
			this.videos = new VideoCollection([], {id: this.id});
		}
	}

	getPath() {
		return `/movie/${this.id}`;
	}

	parse(response) {
		response.backdrop = this.generateImageUrl(response.backdrop_path);
		response.poster = this.generateImageUrl(response.poster_path);
		response.poster_size = this.getConfiguration().get('images').poster_sizes[3];
		response.release_date = Moment(response.release_date, 'YYYY-MM-DD').format('MMMM Do YYYY');
		response.vote_average = parseFloat(response.vote_average).toFixed(1);
		return response;
	}

	generateImageUrl(imagePath) {
		let imageConfig = this.getConfiguration().get('images');
		return imageConfig.base_url + imageConfig.poster_sizes[3] + imagePath;
	}

	/**
	 * If model has been configured with videos collection
	 * then fetch associated videos in parallel
	 *
	 * @return {Object} deffered
	 */
	fetch() {
		if (this.videos) {
			return $.when(this.videos.fetch(), Model.prototype.fetch.apply(this, arguments))
		}
		return Model.prototype.fetch.apply(this, arguments);
	}
}
