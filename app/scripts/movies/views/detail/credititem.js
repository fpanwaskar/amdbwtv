import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import itemTemplate from 'movies/templates/detail/credititem.hbs';

export default Marionette.ItemView.extend({
	className: 'movie-credits__item',
	tagName: 'li',
	template: itemTemplate,

	events: {
		'click': 'onClick'
	},

	onClick: function() {
		Radio.channel('appRouter').trigger('navigate', '#person/' + this.model.get('id'), {trigger: true});
	}
});
