import Radio from 'backbone.radio';
import $ from 'jquery';
import _ from 'lodash';

import Model from 'common/models/base';

const CONFIG_NAME = 'config';

export default Model.extend({
	localStorage: window.localStorage,

	getPath() {
		return '/configuration';
	},

	fetch() {
		const config = this.localStorage.getItem(CONFIG_NAME);
		if (config) {
			let deferred = $.Deferred();
			this.set(JSON.parse(config));
			deferred.resolve();
			return deferred.promise();
		} else {
			const options = {
				success: _.bind(this.onFetchSuccess, this)
			};
			return Model.prototype.fetch.apply(this, [options]);
		}
	},

	onFetchSuccess(response) {
		const data = JSON.stringify(response);
		this.localStorage.setItem(CONFIG_NAME, data);
	}
});
