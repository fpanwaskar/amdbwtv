import Marionette from 'backbone.marionette';
import template from 'movies/templates/detail/overview.hbs';

export default Marionette.ItemView.extend({
	className: 'movie-detail',

	template: template,

	ui: {
    	video: ".video-js"
  	},

	serializeData() {
		let data = this.model.toJSON();
		if (this.model.videos && !this.model.videos.isEmpty()) {
			let firstVideo = this.model.videos.models[0].toJSON();
			data.video = firstVideo;
			data.video.url = this.getTrailerUrl(firstVideo);
		}
		return data;
	},

	getTrailerUrl(video) {
		if (video && video.key) {
			return `http://www.youtube.com/embed/${video.key}?autoplay=0&origin=http://localhost:9000&modestbranding=1&showinfo=0&iv_load_policy=3&color=white`;
		}
	}
});
