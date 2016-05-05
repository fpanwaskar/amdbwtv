import {Collection} from 'backbone';

import Model from 'common/models/base';
import PersonModel from 'movies/models/person';

export default Model.extend({
	getPath() {
		return `/movie/${this.movieId}/credits`;
	},

	initialize(models, options) {
		if (!options.movieId) {
			throw new Error('Credits must be initialised with a movie id.')
		}
		this.movieId = options.movieId;
		Model.prototype.initialize.apply(this, arguments);
	},

	parse(response) {
		response.cast = new Collection(response.cast, {model: PersonModel, parse: true});
		response.crew = new Collection(response.crew, {model: PersonModel, parse: true});
		return response;
	}
})
