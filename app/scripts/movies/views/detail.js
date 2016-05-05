import Marionette from 'backbone.marionette';

import CreditsModel from 'movies/models/credits';
import DetailOverview from 'movies/views/detail/overview';
import Credits from 'movies/views/detail/credits';
import CreditItem from 'movies/views/detail/credititem';

import template from 'movies/templates/detail.hbs';

export default Marionette.LayoutView.extend({
	template: template,

	regions: {
		detail: '.movie-detail-region',
		credits: '.movie-credits-region'
	},

	onBeforeShow() {
		this.showChildView('detail', new DetailOverview({model: this.model}));

		this.credits = new CreditsModel([], {movieId: this.model.get('id')});
		this.credits.fetch().done(() => this.showChildView('credits', new Credits({collection: this.credits.get('cast'), childView: CreditItem})));
	}
});
