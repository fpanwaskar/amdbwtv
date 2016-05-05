import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import Header from 'common/layout/views/header';
import template from 'common/layout/templates/default.hbs';

let contentChannel = Radio.channel('appContent');

export default Marionette.LayoutView.extend({
	template: template,
	regions: {
		header: '.header-wrapper',
  		content: '.content'
	},

	initialize() {
		Marionette.LayoutView.prototype.initialize.apply(this, arguments);
		contentChannel.on('updateContent', (content) => {
			this.showHeader();
			this.showChildView('content', content);
		});
	},

	showHeader() {
		if (! this.headerView) {
			this.headerView = new Header();
			this.showChildView('header', this.headerView);
		}
	}
});
