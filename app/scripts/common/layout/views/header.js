import Marionette from 'backbone.marionette';
import move from 'move-js'
import Radio from 'backbone.radio';
import Navigation from 'common/navigation/views/navigation';
import template from 'common/layout/templates/header.hbs';

let overlayChannel = Radio.channel('appOverlay');
const MENU_CLOSE_CLASS = 'header__menu-btn--close',
	MENU_BACK_CLASS = 'header__menu-btn--back',
	MENU_BURGER_CLASS = 'header__menu-btn--burger',
	HEADER_TRANSPARENT_CLASS = 'header--transparent',
	DETAIL_ROUTE_NAME = 'movieDetail';

export default Marionette.ItemView.extend({
	template: template,

	className: 'header',

	ui: {
		menuButton: '.header__menu-btn--burger',
		closeButton: '.header__menu-btn--close',
		backButton: '.header__menu-btn--back',
		title: '.header__title',
		searchButton: '.header__search-btn'
	},

	events: {
		'click @ui.menuButton': 'onMenuButtonClick',
		'click @ui.closeButton': 'onCloseButtonClick',
		'click @ui.backButton': 'onBackButtonClick',
		'click @ui.searchButton': 'onSearchButtonClick',
	},

	initialize() {
		Marionette.ItemView.prototype.initialize.apply(this, arguments);
		this.listenTo(overlayChannel, 'opened', this.onOverlayOpened);
		this.listenTo(overlayChannel, 'closed', this.onOverlayClosed);
		this.listenTo(Radio.channel('appRouter'), 'change:route', this.handleRouteChange);
	},

	onMenuButtonClick() {
		overlayChannel.request('open', {content: new Navigation(), colour: '#D93A32'});
	},

	/**
	 * Currently only handles overlay
	 */
	onCloseButtonClick() {
		overlayChannel.request('close');
	},

	onBackButtonClick() {
		window.history.back();
	},

	onOverlayOpened() {
		this.ui.menuButton.removeClass(MENU_BURGER_CLASS);
		this.ui.menuButton.addClass(MENU_CLOSE_CLASS);
		this.$el.addClass(HEADER_TRANSPARENT_CLASS);
		this.hideComponent(this.ui.searchButton.selector);
		this.hideComponent(this.ui.title.selector);
	},

	onOverlayClosed() {
		this.ui.menuButton.addClass(MENU_BURGER_CLASS);
		this.ui.menuButton.removeClass(MENU_CLOSE_CLASS);
		this.$el.removeClass(HEADER_TRANSPARENT_CLASS);
		this.showComponent(this.ui.searchButton.selector);
		this.showComponent(this.ui.title.selector);
	},

	handleRouteChange(route, previous) {
		if (route === DETAIL_ROUTE_NAME) {
			this.ui.menuButton.removeClass(MENU_BURGER_CLASS);
			this.ui.menuButton.addClass(MENU_BACK_CLASS);
			this.hideComponent(this.ui.title.selector);
		} else if (previous === DETAIL_ROUTE_NAME) {
			this.ui.menuButton.removeClass(MENU_BACK_CLASS);
			this.ui.menuButton.addClass(MENU_BURGER_CLASS);
			this.showComponent(this.ui.title.selector);
		}
	},

	showComponent(selector, reverse = false) {
		let opacity = reverse ? 0 : 1,
			visibility = reverse ? 'hidden' : 'visible',
			target = move(selector);

		target.set('opacity', opacity)
			.duration(500)
			.then(() => target.set('visibility', visibility))
			.end();
	},

	hideComponent(selector) {
		this.showComponent(selector, true);
	},

	onSearchButtonClick() {
		console.log('searchButton');
	},

	onShow: function() {
		if (Radio.channel('appRouter').request('getRoute') === DETAIL_ROUTE_NAME) {
			this.handleRouteChange(DETAIL_ROUTE_NAME, '');
		}
  	}
});
