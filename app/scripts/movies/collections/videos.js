import Collection from 'common/collections/base'

export default Collection.extend({
	getPath() {
		return `/movie/${this.id}/videos`;
	},

	initialize(models, options) {
		Collection.prototype.initialize.apply(this, arguments);
		this.id = options.id;
	}
});
