import {Model} from 'backbone';
import Radio from 'backbone.radio';

export default Model.extend({
	getPath() {
		return '';
	},

	url() {
		return `${this.getSettings().apiBaseUrl}/${this.getSettings().apiVersion}${this.getPath()}?api_key=${this.getSettings().apiKey}`;
	},

	getSettings() {
		if (!this.settings) {
			this.settings = Radio.channel('appState').request('settings');
		}
		return this.settings;
	},

	getConfiguration() {
		if (!this.configuration) {
			this.configuration = Radio.channel('appState').request('configuration');
		}
		return this.configuration;
	},

	parse(response) {
		return response;
	}
})
