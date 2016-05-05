import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import itemTemplate from './../templates/movieItem.hbs';

export default Marionette.ItemView.extend({
	className: 'movie-item',
	tagName: 'li',
	template: itemTemplate,

	events: {
		'click': 'onClick'
	},

	onClick: function() {
		Radio.channel('appRouter').trigger('navigate', '#movie/' + this.model.get('id'), {trigger: true});
	}
});
