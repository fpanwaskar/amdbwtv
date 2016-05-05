import Marionette from 'backbone.marionette';
import navigationCollection from 'common/navigation/collections/navigation';
import template from 'common/navigation/templates/navigationitem.hbs';

export default Marionette.CollectionView.extend({
	collection: navigationCollection,
	childView: Marionette.ItemView.extend({}),
	childViewOptions: {
		tagName: 'li',
		template: template
	},
	className: 'navigation',
	tagName: 'ul'
});
